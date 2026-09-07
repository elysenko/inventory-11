import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/auth.service';
import { ItemsApi } from '../../../core/api/items-api.service';
import { errorMessage } from '../../../core/api/api-error';
import { Item } from '../../../core/models';
import { mergeQueryParams, readBoolean, readNumber, readText } from '../../../core/query-params';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-item-list',
  imports: [RouterLink],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ItemsApi);

  readonly pageSize = PAGE_SIZE;

  /**
   * The whole catalogue, loaded once.
   *
   * The header counts every tracked item and every low-stock item regardless of
   * the active filter, so this deliberately holds the unfiltered set and the
   * search / low-stock filters are applied below. That also keeps paging
   * instant, which matters because the filters round-trip through the URL.
   */
  readonly items = signal<Item[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);

  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  readonly query = computed(() => readText(this.params().get('q')));
  readonly lowStockOnly = computed(() => readBoolean(this.params().get('lowStock')));
  readonly page = computed(() => readNumber(this.params().get('page'), 1));
  readonly deleteId = computed(() =>
    this.params().get('modal') === 'confirm-delete' ? this.params().get('id') : null,
  );

  readonly filtered = computed(() => {
    const needle = this.query().toLowerCase();
    return this.items().filter((item) => {
      const matchesText =
        !needle ||
        item.sku.toLowerCase().includes(needle) ||
        item.name.toLowerCase().includes(needle);
      const matchesLow = !this.lowStockOnly() || this.isLow(item);
      return matchesText && matchesLow;
    });
  });

  readonly pageCount = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));
  readonly currentPage = computed(() => Math.min(this.page(), this.pageCount()));
  readonly rows = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  readonly rangeStart = computed(() =>
    this.filtered().length === 0 ? 0 : (this.currentPage() - 1) * PAGE_SIZE + 1,
  );
  readonly rangeEnd = computed(() =>
    Math.min(this.currentPage() * PAGE_SIZE, this.filtered().length),
  );

  readonly lowCount = computed(() => this.items().filter((item) => this.isLow(item)).length);
  readonly pendingDelete = computed(() =>
    this.items().find((item) => item.id === this.deleteId()) ?? null,
  );

  /** Set when the API rejects a delete with 409 (the item is referenced by movements). */
  readonly deleteError = signal<string | null>(null);
  readonly deleting = signal(false);

  constructor() {
    void this.reload();
  }

  async reload(): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    try {
      this.items.set(await this.api.listAll());
    } catch (err) {
      this.items.set([]);
      this.loadError.set(errorMessage(err));
    } finally {
      this.loading.set(false);
    }
  }

  isLow(item: Item): boolean {
    return item.totalQty <= item.reorderAt;
  }

  search(value: string): void {
    mergeQueryParams(this.router, { q: value.trim(), page: null });
  }

  toggleLowStock(checked: boolean): void {
    mergeQueryParams(this.router, { lowStock: checked, page: null });
  }

  clearFilters(): void {
    mergeQueryParams(this.router, { q: null, lowStock: null, page: null });
  }

  goToPage(page: number): void {
    mergeQueryParams(this.router, { page: page <= 1 ? null : page });
  }

  askDelete(item: Item): void {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: 'confirm-delete', id: item.id });
  }

  closeDelete(): void {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: null, id: null });
  }

  /**
   * The server refuses an item with recorded movements or stock on hand with a
   * 409. That message is the authoritative one, so it is shown verbatim and the
   * modal stays open — the row is only dropped once the delete really happened.
   */
  async confirmDelete(item: Item): Promise<void> {
    this.deleteError.set(null);
    this.deleting.set(true);
    try {
      await this.api.remove(item.id);
      this.closeDelete();
      await this.reload();
    } catch (err) {
      this.deleteError.set(errorMessage(err));
    } finally {
      this.deleting.set(false);
    }
  }
}
