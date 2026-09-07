import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ItemsApi, ItemPayload } from '../../../core/api/items-api.service';
import { toProblem } from '../../../core/api/api-error';
import { Item } from '../../../core/models';
import { mergeQueryParams } from '../../../core/query-params';

const BASE_UNITS = ['ea', 'box', 'roll', 'drum', 'pallet', 'kg', 'litre'];

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
  private readonly api = inject(ItemsApi);

  readonly id = input<string>('');

  readonly existing = signal<Item | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly deleting = signal(false);

  /**
   * `withComponentInputBinding()` binds the :id route param, but on a route that
   * has no :id (the "new" form) it supplies `undefined` rather than leaving the
   * declared default in place. Normalising here is what keeps `editing()` false
   * on /new — comparing the raw input against '' would make `undefined` look like
   * an edit and send the create to PATCH /:id/undefined.
   */
  readonly itemId = computed(() => (this.id() ?? '').trim());

  readonly editing = computed(() => this.itemId() !== '');

  /**
   * An item created before this list existed (or seeded with a unit outside it)
   * must still round-trip its own unit, so the stored value is folded in rather
   * than silently rewritten by the select falling back to its first option.
   */
  readonly units = computed(() => {
    const current = this.existing()?.unit;
    return current && !BASE_UNITS.includes(current) ? [...BASE_UNITS, current] : BASE_UNITS;
  });

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
      const id = this.itemId();
      void this.load(id);
    });

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

  private async load(id: string): Promise<void> {
    if (!id) {
      this.existing.set(null);
      return;
    }
    this.loading.set(true);
    this.formError.set(null);
    try {
      this.existing.set(await this.api.get(id));
    } catch (err) {
      this.existing.set(null);
      this.formError.set(toProblem(err).message);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Client-side checks cover only what the user can see is wrong before a
   * round-trip. Uniqueness is not among them: the catalogue is not loaded here,
   * and only the server can decide it without a race — a duplicate comes back as
   * a 422 carrying `field: 'sku'`, which lands under the SKU input.
   */
  async save(): Promise<void> {
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
    if (!Number.isInteger(this.reorderAt()) || this.reorderAt() < 0) {
      this.formError.set('The reorder point must be a whole number of 0 or more.');
      return;
    }

    const payload: ItemPayload = {
      sku,
      name: this.name().trim(),
      description: this.description().trim() || null,
      unit: this.unit(),
      reorderAt: this.reorderAt(),
    };

    this.saving.set(true);
    try {
      if (this.editing()) {
        await this.api.update(this.itemId(), payload);
      } else {
        await this.api.create(payload);
      }
      this.saved.set(true);
      void this.router.navigate(['/items']);
    } catch (err) {
      const problem = toProblem(err);
      if (problem.field === 'sku') {
        this.skuError.set(problem.message);
      } else {
        this.formError.set(problem.message);
      }
    } finally {
      this.saving.set(false);
    }
  }

  askDelete(): void {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: 'confirm-delete', id: this.itemId() });
  }

  closeDelete(): void {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: null, id: null });
  }

  /**
   * An item with recorded movements can never be deleted — movements are
   * immutable and removing the item would orphan the ledger. The server says so
   * with a 409, and that message is shown rather than assuming success.
   */
  async confirmDelete(): Promise<void> {
    if (!this.editing()) return;
    this.deleteError.set(null);
    this.deleting.set(true);
    try {
      await this.api.remove(this.itemId());
      void this.router.navigate(['/items']);
    } catch (err) {
      this.deleteError.set(toProblem(err).message);
    } finally {
      this.deleting.set(false);
    }
  }
}
