import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/auth.service';
import { ItemDetail, Movement } from '../../../core/models';
import { formatDateTime, readOneOf } from '../../../core/query-params';

const TABS = ['stock', 'history'] as const;
type Tab = (typeof TABS)[number];

@Component({
  selector: 'app-item-detail',
  imports: [RouterLink],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailComponent {
  readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  /** Bound from the :id route param by withComponentInputBinding(). */
  readonly id = input<string>('');

  readonly formatDateTime = formatDateTime;

  readonly details = signal<ItemDetail[]>([
    {
      id: 'itm-001', sku: 'SKU-001', name: 'Galvanised shelf bracket', description: 'Heavy duty, 400mm arm', unit: 'ea', reorderAt: 40, totalQty: 128,
      stockLevels: [
        { locationId: 'loc-a', locationName: 'Main', zone: 'Zone A', qty: 64 },
        { locationId: 'loc-b', locationName: 'Main', zone: 'Zone B', qty: 40 },
        { locationId: 'loc-c', locationName: 'Overflow', zone: 'Zone C', qty: 24 },
      ],
    },
    {
      id: 'itm-002', sku: 'SKU-002', name: 'M8 hex bolt, 100 pack', description: 'Zinc plated, DIN 933', unit: 'box', reorderAt: 25, totalQty: 18,
      stockLevels: [
        { locationId: 'loc-a', locationName: 'Main', zone: 'Zone A', qty: 12 },
        { locationId: 'loc-b', locationName: 'Main', zone: 'Zone B', qty: 6 },
        { locationId: 'loc-c', locationName: 'Overflow', zone: 'Zone C', qty: 0 },
      ],
    },
    {
      id: 'itm-008', sku: 'SKU-008', name: 'Forklift hydraulic oil 20L', description: 'ISO VG 46', unit: 'drum', reorderAt: 8, totalQty: 3,
      stockLevels: [
        { locationId: 'loc-a', locationName: 'Main', zone: 'Zone A', qty: 3 },
        { locationId: 'loc-c', locationName: 'Overflow', zone: 'Zone C', qty: 0 },
      ],
    },
  ]);

  readonly history = signal<Movement[]>([
    { id: 'mv-101', type: 'IN', itemId: 'itm-001', itemSku: 'SKU-001', itemName: 'Galvanised shelf bracket', fromLocName: null, toLocName: 'Main · Zone A', qty: 80, note: 'PO-4471 delivery', userEmail: 'priya.nandi@stockroom.example', createdAt: '2026-09-05T08:14:00Z' },
    { id: 'mv-102', type: 'TRANSFER', itemId: 'itm-001', itemSku: 'SKU-001', itemName: 'Galvanised shelf bracket', fromLocName: 'Main · Zone A', toLocName: 'Overflow · Zone C', qty: 24, note: 'Rebalancing pick face', userEmail: 'dana.whitfield@stockroom.example', createdAt: '2026-09-05T13:02:00Z' },
    { id: 'mv-103', type: 'OUT', itemId: 'itm-001', itemSku: 'SKU-001', itemName: 'Galvanised shelf bracket', fromLocName: 'Main · Zone B', toLocName: null, qty: 16, note: 'Works order WO-882', userEmail: 'tomas.berg@stockroom.example', createdAt: '2026-09-06T09:47:00Z' },
    { id: 'mv-104', type: 'IN', itemId: 'itm-001', itemSku: 'SKU-001', itemName: 'Galvanised shelf bracket', fromLocName: null, toLocName: 'Main · Zone B', qty: 56, note: 'PO-4488 delivery', userEmail: 'priya.nandi@stockroom.example', createdAt: '2026-09-06T15:20:00Z' },
  ]);

  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  readonly tab = computed<Tab>(() => readOneOf(this.params().get('tab'), TABS, 'stock'));

  readonly item = computed<ItemDetail>(
    () => this.details().find((row) => row.id === this.id()) ?? this.details()[0]!,
  );

  readonly movements = computed(() => this.history().filter((row) => row.itemId === this.item().id));

  readonly onHand = computed(() =>
    this.item().stockLevels.reduce((total, level) => total + level.qty, 0),
  );

  readonly isLow = computed(() => this.onHand() <= this.item().reorderAt);
  readonly deficit = computed(() => Math.max(0, this.item().reorderAt - this.onHand()));
  readonly usedLocations = computed(
    () => this.item().stockLevels.filter((level) => level.qty > 0).length,
  );
}
