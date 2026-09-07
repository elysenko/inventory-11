import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ItemsApi } from '../../../core/api/items-api.service';
import { LocationsApi } from '../../../core/api/locations-api.service';
import { MovementsApi, MovementPayload } from '../../../core/api/movements-api.service';
import { BalanceMap, StockApi } from '../../../core/api/stock-api.service';
import { errorMessage } from '../../../core/api/api-error';
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
  private readonly itemsApi = inject(ItemsApi);
  private readonly locationsApi = inject(LocationsApi);
  private readonly movementsApi = inject(MovementsApi);
  private readonly stockApi = inject(StockApi);

  readonly typeOptions = TYPES;

  readonly items = signal<Item[]>([]);
  readonly locations = signal<Location[]>([]);

  /**
   * On-hand per (item, location), used only for the "N units held there" hint
   * and the pre-submit warning. Advisory: the authoritative check runs under a
   * row lock inside the server's movement transaction, so a stale value here
   * can never let an overdraw through.
   */
  readonly balances = signal<BalanceMap>({});

  readonly loading = signal(true);
  readonly submitting = signal(false);

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
    void this.load();

    // Prefill from ?itemId=&type= so low-stock and item pages can deep-link a restock.
    effect(() => {
      const map = this.params();
      this.type.set(readOneOf(map.get('type'), TYPES, 'IN'));
      const prefilled = readText(map.get('itemId'));
      this.itemId.set(prefilled || (this.items()[0]?.id ?? ''));
    });
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.formError.set(null);
    try {
      const [items, locations, balances] = await Promise.all([
        this.itemsApi.listAll(),
        this.locationsApi.listAll(),
        this.stockApi.balances(),
      ]);
      this.items.set(items);
      this.locations.set(locations);
      this.balances.set(balances);
    } catch (err) {
      this.formError.set(errorMessage(err));
    } finally {
      this.loading.set(false);
    }
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

  async submit(): Promise<void> {
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

    // The unused side is omitted rather than sent blank: an IN carrying a
    // fromLocId is a shape error, not an empty field.
    const payload: MovementPayload = {
      type: this.type(),
      itemId: this.itemId(),
      qty: this.qty(),
      ...(this.needsFrom() ? { fromLocId: this.fromLocId() } : {}),
      ...(this.needsTo() ? { toLocId: this.toLocId() } : {}),
      ...(this.note().trim() ? { note: this.note().trim() } : {}),
    };

    this.submitting.set(true);
    try {
      const movement = await this.movementsApi.create(payload);
      void this.router.navigate(['/items', movement.itemId], { queryParams: { tab: 'history' } });
    } catch (err) {
      // An overdraw comes back as 422 "Insufficient stock". The whole
      // transaction rolled back, so nothing was written and the stored balance
      // is untouched — the server's message says so and is shown verbatim.
      this.formError.set(errorMessage(err));
      // The rejection may mean the local hint was stale; re-read it so the next
      // attempt is judged against the real balance.
      void this.refreshBalances();
    } finally {
      this.submitting.set(false);
    }
  }

  private async refreshBalances(): Promise<void> {
    try {
      this.balances.set(await this.stockApi.balances());
    } catch {
      /* the hint is advisory — leaving it stale must not mask the real error */
    }
  }
}
