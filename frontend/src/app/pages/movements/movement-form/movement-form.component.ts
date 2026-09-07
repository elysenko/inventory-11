import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Item, Location, MovementType } from '../../../core/models';
import { readOneOf, readText } from '../../../core/query-params';

const TYPES = ['IN', 'OUT', 'TRANSFER'] as const;

@Component({
  selector: 'app-movement-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './movement-form.component.html',
  styleUrl: './movement-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovementFormComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly typeOptions = TYPES;

  readonly items = signal<Item[]>([
    { id: 'itm-001', sku: 'SKU-001', name: 'Galvanised shelf bracket', description: null, unit: 'ea', reorderAt: 40, totalQty: 128 },
    { id: 'itm-002', sku: 'SKU-002', name: 'M8 hex bolt, 100 pack', description: null, unit: 'box', reorderAt: 25, totalQty: 18 },
    { id: 'itm-003', sku: 'SKU-003', name: 'Stretch wrap film 500mm', description: null, unit: 'roll', reorderAt: 30, totalQty: 96 },
    { id: 'itm-005', sku: 'SKU-005', name: 'Thermal label 4×6, 1000 pack', description: null, unit: 'box', reorderAt: 20, totalQty: 20 },
    { id: 'itm-008', sku: 'SKU-008', name: 'Forklift hydraulic oil 20L', description: null, unit: 'drum', reorderAt: 8, totalQty: 3 },
  ]);

  readonly locations = signal<Location[]>([
    { id: 'loc-a', name: 'Main', zone: 'Zone A', itemCount: 6, totalQty: 412 },
    { id: 'loc-b', name: 'Main', zone: 'Zone B', itemCount: 5, totalQty: 268 },
    { id: 'loc-c', name: 'Overflow', zone: 'Zone C', itemCount: 4, totalQty: 131 },
    { id: 'loc-d', name: 'Goods in', zone: 'Dock 1', itemCount: 2, totalQty: 34 },
  ]);

  /** On-hand per (item, location) — drives the local insufficient-stock preview. */
  readonly balances = signal<Record<string, number>>({
    'itm-001|loc-a': 64, 'itm-001|loc-b': 40, 'itm-001|loc-c': 24,
    'itm-002|loc-a': 12, 'itm-002|loc-b': 6, 'itm-002|loc-c': 0,
    'itm-003|loc-a': 48, 'itm-003|loc-b': 48,
    'itm-005|loc-a': 20,
    'itm-008|loc-a': 3,
  });

  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  readonly type = signal<MovementType>('IN');
  readonly itemId = signal('');
  readonly fromLocId = signal('');
  readonly toLocId = signal('');
  readonly qty = signal(1);
  readonly note = signal('');
  readonly formError = signal<string | null>(null);

  constructor() {
    // Prefill from ?itemId=&type= so low-stock and item pages can deep-link a restock.
    effect(() => {
      const map = this.params();
      this.type.set(readOneOf(map.get('type'), TYPES, 'IN'));
      const prefilled = readText(map.get('itemId'));
      this.itemId.set(prefilled || (this.items()[0]?.id ?? ''));
    });
  }

  readonly selectedItem = computed(() => this.items().find((item) => item.id === this.itemId()) ?? null);
  readonly needsFrom = computed(() => this.type() === 'OUT' || this.type() === 'TRANSFER');
  readonly needsTo = computed(() => this.type() === 'IN' || this.type() === 'TRANSFER');

  readonly sourceBalance = computed(() => {
    if (!this.needsFrom() || !this.itemId() || !this.fromLocId()) return null;
    return this.balances()[`${this.itemId()}|${this.fromLocId()}`] ?? 0;
  });

  locationLabel(location: Location): string {
    return `${location.name} · ${location.zone}`;
  }

  setType(value: string): void {
    this.type.set(readOneOf(value, TYPES, 'IN'));
    this.formError.set(null);
    if (!this.needsFrom()) this.fromLocId.set('');
    if (!this.needsTo()) this.toLocId.set('');
  }

  submit(): void {
    this.formError.set(null);

    if (!this.itemId()) {
      this.formError.set('Choose the item being moved.');
      return;
    }
    if (this.qty() < 1 || !Number.isInteger(this.qty())) {
      this.formError.set('Quantity must be a whole number of at least 1.');
      return;
    }
    if (this.needsFrom() && !this.fromLocId()) {
      this.formError.set('Choose the location the stock is leaving.');
      return;
    }
    if (this.needsTo() && !this.toLocId()) {
      this.formError.set('Choose the location the stock is arriving at.');
      return;
    }
    if (this.type() === 'TRANSFER' && this.fromLocId() === this.toLocId()) {
      this.formError.set('A transfer needs two different locations.');
      return;
    }

    // The API rejects an overdraw with 422 "Insufficient stock" and rolls the whole
    // transaction back — nothing is written, so the stored balance is untouched.
    const available = this.sourceBalance();
    if (available !== null && this.qty() > available) {
      this.formError.set(
        `Insufficient stock — only ${available} ${this.selectedItem()?.unit ?? 'units'} of ${this.selectedItem()?.sku} are held at that location. Nothing was recorded.`,
      );
      return;
    }

    void this.router.navigate(['/items', this.itemId()], { queryParams: { tab: 'history' } });
  }
}
