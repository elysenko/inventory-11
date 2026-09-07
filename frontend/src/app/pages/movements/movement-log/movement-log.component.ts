import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ItemsApi } from '../../../core/api/items-api.service';
import { MovementsApi } from '../../../core/api/movements-api.service';
import { errorMessage } from '../../../core/api/api-error';
import { Item, Movement, MovementType } from '../../../core/models';
import { formatDateTime, mergeQueryParams, readNumber, readText } from '../../../core/query-params';

const PAGE_SIZE = 8;
const TYPES: MovementType[] = ['IN', 'OUT', 'TRANSFER'];

@Component({
  selector: 'app-movement-log',
  imports: [RouterLink],
  templateUrl: './movement-log.component.html',
  styleUrl: './movement-log.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovementLogComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly itemsApi = inject(ItemsApi);
  private readonly movementsApi = inject(MovementsApi);

  readonly typeOptions = TYPES;
  readonly formatDateTime = formatDateTime;

  /** Populates the item filter's select. Independent of the active filters. */
  readonly items = signal<Item[]>([]);

  /** The filtered ledger. Filtering happens server-side; paging is local. */
  readonly movements = signal<Movement[]>([]);

  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);

  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  readonly itemFilter = computed(() => readText(this.params().get('itemId')));
  readonly typeFilter = computed(() => readText(this.params().get('type')));
  readonly from = computed(() => readText(this.params().get('from')));
  readonly to = computed(() => readText(this.params().get('to')));
  readonly page = computed(() => readNumber(this.params().get('page'), 1));

  readonly hasFilters = computed(
    () => !!(this.itemFilter() || this.typeFilter() || this.from() || this.to()),
  );

  /**
   * The rows are already filtered by the API; this stays as the name the pager
   * and the count read, so "N movements match" means the whole filtered set
   * rather than the current page.
   */
  readonly filtered = computed(() => this.movements());

  readonly pageCount = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));
  readonly currentPage = computed(() => Math.min(this.page(), this.pageCount()));
  readonly rows = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  constructor() {
    void this.loadItems();

    // Re-queries whenever a filter changes. `page` is deliberately not read
    // here: paging is local, so turning a page must not refetch.
    effect(() => {
      const query = {
        itemId: this.itemFilter(),
        type: this.typeFilter(),
        from: this.from(),
        to: this.to(),
      };
      void this.loadMovements(query);
    });
  }

  /** Re-runs the current query — used by the error state's "Try again". */
  reload(): Promise<void> {
    return this.loadMovements({
      itemId: this.itemFilter(),
      type: this.typeFilter(),
      from: this.from(),
      to: this.to(),
    });
  }

  private async loadItems(): Promise<void> {
    try {
      this.items.set(await this.itemsApi.listAll());
    } catch {
      // A failure here only costs the filter dropdown its options; the log
      // itself still renders and reports its own errors.
      this.items.set([]);
    }
  }

  private async loadMovements(query: {
    itemId: string;
    type: string;
    from: string;
    to: string;
  }): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    try {
      this.movements.set(await this.movementsApi.listAll(query));
    } catch (err) {
      this.movements.set([]);
      this.loadError.set(errorMessage(err));
    } finally {
      this.loading.set(false);
    }
  }

  setFilter(key: 'itemId' | 'type' | 'from' | 'to', value: string): void {
    mergeQueryParams(this.router, { [key]: value.trim(), page: null });
  }

  clearFilters(): void {
    mergeQueryParams(this.router, { itemId: null, type: null, from: null, to: null, page: null });
  }

  goToPage(page: number): void {
    mergeQueryParams(this.router, { page: page <= 1 ? null : page });
  }
}
