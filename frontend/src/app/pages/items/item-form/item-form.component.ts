import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Item } from '../../../core/models';
import { mergeQueryParams } from '../../../core/query-params';

@Component({
  selector: 'app-item-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemFormComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly id = input<string>('');

  readonly items = signal<Item[]>([
    { id: 'itm-001', sku: 'SKU-001', name: 'Galvanised shelf bracket', description: 'Heavy duty, 400mm arm', unit: 'ea', reorderAt: 40, totalQty: 128 },
    { id: 'itm-002', sku: 'SKU-002', name: 'M8 hex bolt, 100 pack', description: 'Zinc plated, DIN 933', unit: 'box', reorderAt: 25, totalQty: 18 },
    { id: 'itm-008', sku: 'SKU-008', name: 'Forklift hydraulic oil 20L', description: 'ISO VG 46', unit: 'drum', reorderAt: 8, totalQty: 3 },
  ]);

  readonly units = signal<string[]>(['ea', 'box', 'roll', 'drum', 'pallet', 'kg', 'litre']);

  readonly editing = computed(() => this.id() !== '');
  readonly existing = computed(() => this.items().find((item) => item.id === this.id()) ?? null);

  readonly sku = signal('');
  readonly name = signal('');
  readonly description = signal('');
  readonly unit = signal('ea');
  readonly reorderAt = signal(0);

  readonly skuError = signal<string | null>(null);
  readonly formError = signal<string | null>(null);
  readonly saved = signal(false);

  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  readonly confirmingDelete = computed(
    () => this.params().get('modal') === 'confirm-delete' && this.editing(),
  );
  readonly deleteError = signal<string | null>(null);

  constructor() {
    effect(() => {
      const item = this.existing();
      if (!item) return;
      this.sku.set(item.sku);
      this.name.set(item.name);
      this.description.set(item.description ?? '');
      this.unit.set(item.unit);
      this.reorderAt.set(item.reorderAt);
    });
  }

  save(): void {
    this.skuError.set(null);
    this.formError.set(null);

    const sku = this.sku().trim().toUpperCase();
    if (!sku) {
      this.skuError.set('A SKU is required.');
      return;
    }
    if (!this.name().trim()) {
      this.formError.set('Give the item a name so the floor can identify it.');
      return;
    }
    if (this.reorderAt() < 0) {
      this.formError.set('The reorder point cannot be negative.');
      return;
    }

    // The API answers a duplicate SKU with 422 against the sku field — mirror that here.
    const clash = this.items().find((item) => item.sku === sku && item.id !== this.id());
    if (clash) {
      this.skuError.set(`${sku} is already used by “${clash.name}”. SKUs must be unique.`);
      return;
    }

    this.saved.set(true);
    void this.router.navigate(['/items']);
  }

  askDelete(): void {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: 'confirm-delete', id: this.id() });
  }

  closeDelete(): void {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: null, id: null });
  }

  confirmDelete(): void {
    const item = this.existing();
    if (item && item.totalQty > 0) {
      this.deleteError.set(
        `${item.sku} is referenced by recorded movements and still holds ${item.totalQty} ${item.unit}. Movements are immutable, so this item cannot be deleted.`,
      );
      return;
    }
    void this.router.navigate(['/items']);
  }
}
