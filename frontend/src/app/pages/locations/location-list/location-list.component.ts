import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
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

  readonly locations = signal<Location[]>([
    { id: 'loc-a', name: 'Main', zone: 'Zone A', itemCount: 6, totalQty: 412 },
    { id: 'loc-b', name: 'Main', zone: 'Zone B', itemCount: 5, totalQty: 268 },
    { id: 'loc-c', name: 'Overflow', zone: 'Zone C', itemCount: 4, totalQty: 131 },
    { id: 'loc-d', name: 'Goods in', zone: 'Dock 1', itemCount: 2, totalQty: 34 },
    { id: 'loc-e', name: 'Quarantine', zone: 'Zone Q', itemCount: 0, totalQty: 0 },
    { id: 'loc-f', name: 'Returns', zone: 'Dock 2', itemCount: 0, totalQty: 0 },
  ]);

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

  confirmDelete(location: Location): void {
    // A location holding stock is rejected server-side with 409 — surface it, do not
    // silently orphan the quantities.
    if (location.totalQty > 0) {
      this.deleteError.set(
        `${location.name} · ${location.zone} still holds ${location.totalQty} units across ${location.itemCount} items. Transfer the stock out before deleting it.`,
      );
      return;
    }
    this.locations.update((rows) => rows.filter((row) => row.id !== location.id));
    this.closeDelete();
  }
}
