import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocationsApi } from '../../../core/api/locations-api.service';
import { errorMessage } from '../../../core/api/api-error';
import { Location } from '../../../core/models';
import { mergeQueryParams, readNumber } from '../../../core/query-params';

const PAGE_SIZE = 5;

@Component({
  selector: 'app-location-list',
  imports: [RouterLink],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationListComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(LocationsApi);

  /** Every location, so the footer count covers the whole set, not one page. */
  readonly locations = signal<Location[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);

  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  readonly page = computed(() => readNumber(this.params().get('page'), 1));
  readonly pageCount = computed(() => Math.max(1, Math.ceil(this.locations().length / PAGE_SIZE)));
  readonly currentPage = computed(() => Math.min(this.page(), this.pageCount()));
  readonly rows = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.locations().slice(start, start + PAGE_SIZE);
  });

  readonly deleteId = computed(() =>
    this.params().get('modal') === 'confirm-delete' ? this.params().get('id') : null,
  );
  readonly pendingDelete = computed(
    () => this.locations().find((row) => row.id === this.deleteId()) ?? null,
  );
  readonly deleteError = signal<string | null>(null);
  readonly deleting = signal(false);

  constructor() {
    void this.reload();
  }

  async reload(): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    try {
      this.locations.set(await this.api.listAll());
    } catch (err) {
      this.locations.set([]);
      this.loadError.set(errorMessage(err));
    } finally {
      this.loading.set(false);
    }
  }

  goToPage(page: number): void {
    mergeQueryParams(this.router, { page: page <= 1 ? null : page });
  }

  askDelete(location: Location): void {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: 'confirm-delete', id: location.id });
  }

  closeDelete(): void {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: null, id: null });
  }

  /**
   * A location holding stock, or referenced by a movement, is refused with a
   * 409. Surfacing that message is the point — deleting anyway would silently
   * orphan the quantities.
   */
  async confirmDelete(location: Location): Promise<void> {
    this.deleteError.set(null);
    this.deleting.set(true);
    try {
      await this.api.remove(location.id);
      this.closeDelete();
      await this.reload();
    } catch (err) {
      this.deleteError.set(errorMessage(err));
    } finally {
      this.deleting.set(false);
    }
  }
}
