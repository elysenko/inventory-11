import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AuthService } from '../../../core/auth.service';
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

  readonly pageSize = PAGE_SIZE;

  /** Backend-supplied data. service_agent swaps this initializer for an API call. */
  readonly items = signal<Item[]>([
    { id: 'itm-001', sku: 'SKU-001', name: 'Galvanised shelf bracket', description: 'Heavy duty, 400mm arm', unit: 'ea', reorderAt: 40, totalQty: 128 },
    { id: 'itm-002', sku: 'SKU-002', name: 'M8 hex bolt, 100 pack', description: 'Zinc plated, DIN 933', unit: 'box', reorderAt: 25, totalQty: 18 },
    { id: 'itm-003', sku: 'SKU-003', name: 'Stretch wrap film 500mm', description: '23 micron, clear', unit: 'roll', reorderAt: 30, totalQty: 96 },
    { id: 'itm-004', sku: 'SKU-004', name: 'Euro pallet 1200×800', description: 'EPAL certified, grade B', unit: 'ea', reorderAt: 50, totalQty: 212 },
    { id: 'itm-005', sku: 'SKU-005', name: 'Thermal label 4×6, 1000 pack', description: 'Direct thermal, perforated', unit: 'box', reorderAt: 20, totalQty: 20 },
    { id: 'itm-006', sku: 'SKU-006', name: 'Nitrile glove, large, 100 pack', description: 'Powder free, blue', unit: 'box', reorderAt: 35, totalQty: 74 },
    { id: 'itm-007', sku: 'SKU-007', name: 'Corrugated carton 400mm', description: 'Double wall, brown', unit: 'ea', reorderAt: 150, totalQty: 640 },
    { id: 'itm-008', sku: 'SKU-008', name: 'Forklift hydraulic oil 20L', description: 'ISO VG 46', unit: 'drum', reorderAt: 8, totalQty: 3 },
  ]);

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

  confirmDelete(item: Item): void {
    // Items referenced by a movement are blocked server-side with a 409; the UI must
    // surface that rather than assume the delete succeeded.
    if (item.totalQty > 0) {
      this.deleteError.set(
        `${item.sku} has recorded movements and ${item.totalQty} ${item.unit} still on hand. Move the stock out before deleting it.`,
      );
      return;
    }
    this.items.update((items) => items.filter((row) => row.id !== item.id));
    this.closeDelete();
  }
}
