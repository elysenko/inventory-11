import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
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

  readonly typeOptions = TYPES;
  readonly formatDateTime = formatDateTime;

  readonly items = signal<Item[]>([
    { id: 'itm-001', sku: 'SKU-001', name: 'Galvanised shelf bracket', description: null, unit: 'ea', reorderAt: 40, totalQty: 128 },
    { id: 'itm-002', sku: 'SKU-002', name: 'M8 hex bolt, 100 pack', description: null, unit: 'box', reorderAt: 25, totalQty: 18 },
    { id: 'itm-003', sku: 'SKU-003', name: 'Stretch wrap film 500mm', description: null, unit: 'roll', reorderAt: 30, totalQty: 96 },
    { id: 'itm-008', sku: 'SKU-008', name: 'Forklift hydraulic oil 20L', description: null, unit: 'drum', reorderAt: 8, totalQty: 3 },
  ]);

  readonly movements = signal<Movement[]>([
    { id: 'mv-201', type: 'OUT', itemId: 'itm-008', itemSku: 'SKU-008', itemName: 'Forklift hydraulic oil 20L', fromLocName: 'Main · Zone A', toLocName: null, qty: 2, note: 'Truck 3 service', userEmail: 'tomas.berg@stockroom.example', createdAt: '2026-09-06T16:41:00Z' },
    { id: 'mv-104', type: 'IN', itemId: 'itm-001', itemSku: 'SKU-001', itemName: 'Galvanised shelf bracket', fromLocName: null, toLocName: 'Main · Zone B', qty: 56, note: 'PO-4488 delivery', userEmail: 'priya.nandi@stockroom.example', createdAt: '2026-09-06T15:20:00Z' },
    { id: 'mv-103', type: 'OUT', itemId: 'itm-001', itemSku: 'SKU-001', itemName: 'Galvanised shelf bracket', fromLocName: 'Main · Zone B', toLocName: null, qty: 16, note: 'Works order WO-882', userEmail: 'tomas.berg@stockroom.example', createdAt: '2026-09-06T09:47:00Z' },
    { id: 'mv-202', type: 'TRANSFER', itemId: 'itm-003', itemSku: 'SKU-003', itemName: 'Stretch wrap film 500mm', fromLocName: 'Overflow · Zone C', toLocName: 'Main · Zone A', qty: 24, note: 'Pick face top-up', userEmail: 'dana.whitfield@stockroom.example', createdAt: '2026-09-05T17:05:00Z' },
    { id: 'mv-102', type: 'TRANSFER', itemId: 'itm-001', itemSku: 'SKU-001', itemName: 'Galvanised shelf bracket', fromLocName: 'Main · Zone A', toLocName: 'Overflow · Zone C', qty: 24, note: 'Rebalancing pick face', userEmail: 'dana.whitfield@stockroom.example', createdAt: '2026-09-05T13:02:00Z' },
    { id: 'mv-203', type: 'OUT', itemId: 'itm-002', itemSku: 'SKU-002', itemName: 'M8 hex bolt, 100 pack', fromLocName: 'Main · Zone A', toLocName: null, qty: 9, note: 'Line 2 replenishment', userEmail: 'tomas.berg@stockroom.example', createdAt: '2026-09-05T10:26:00Z' },
    { id: 'mv-101', type: 'IN', itemId: 'itm-001', itemSku: 'SKU-001', itemName: 'Galvanised shelf bracket', fromLocName: null, toLocName: 'Main · Zone A', qty: 80, note: 'PO-4471 delivery', userEmail: 'priya.nandi@stockroom.example', createdAt: '2026-09-05T08:14:00Z' },
    { id: 'mv-204', type: 'IN', itemId: 'itm-003', itemSku: 'SKU-003', itemName: 'Stretch wrap film 500mm', fromLocName: null, toLocName: 'Overflow · Zone C', qty: 60, note: 'PO-4460 delivery', userEmail: 'priya.nandi@stockroom.example', createdAt: '2026-09-04T14:33:00Z' },
    { id: 'mv-205', type: 'OUT', itemId: 'itm-002', itemSku: 'SKU-002', itemName: 'M8 hex bolt, 100 pack', fromLocName: 'Main · Zone B', toLocName: null, qty: 4, note: 'Maintenance stores', userEmail: 'dana.whitfield@stockroom.example', createdAt: '2026-09-04T09:12:00Z' },
    { id: 'mv-206', type: 'IN', itemId: 'itm-008', itemSku: 'SKU-008', itemName: 'Forklift hydraulic oil 20L', fromLocName: null, toLocName: 'Main · Zone A', qty: 5, note: 'PO-4402 delivery', userEmail: 'priya.nandi@stockroom.example', createdAt: '2026-09-03T11:58:00Z' },
  ]);

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

  readonly filtered = computed(() =>
    this.movements().filter((movement) => {
      if (this.itemFilter() && movement.itemId !== this.itemFilter()) return false;
      if (this.typeFilter() && movement.type !== this.typeFilter()) return false;
      const day = movement.createdAt.slice(0, 10);
      if (this.from() && day < this.from()) return false;
      if (this.to() && day > this.to()) return false;
      return true;
    }),
  );

  readonly pageCount = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));
  readonly currentPage = computed(() => Math.min(this.page(), this.pageCount()));
  readonly rows = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

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
