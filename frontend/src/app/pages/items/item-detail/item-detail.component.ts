import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/auth.service';
import { ItemsApi } from '../../../core/api/items-api.service';
import { errorMessage } from '../../../core/api/api-error';
import { ItemDetail, Movement } from '../../../core/models';
import { formatDateTime, readOneOf } from '../../../core/query-params';

const TABS = ['stock', 'history'] as const;
type Tab = (typeof TABS)[number];

/**
 * Stand-in while the request is in flight. The template's loading branch means
 * this is never rendered — it exists so the many `item().x` bindings stay
 * non-null without threading an optional through every one of them.
 */
const BLANK: ItemDetail = {
  id: '',
  sku: '',
  name: '',
  description: null,
  unit: '',
  reorderAt: 0,
  totalQty: 0,
  stockLevels: [],
};

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
  private readonly api = inject(ItemsApi);

  /** Bound from the :id route param by withComponentInputBinding(). */
  readonly id = input<string>('');

  readonly formatDateTime = formatDateTime;

  private readonly detail = signal<ItemDetail | null>(null);

  /**
   * The item's own history, from GET /api/items/:id/movements — already scoped
   * to this item and readable by clerks, unlike the manager-only audit log.
   */
  readonly movements = signal<Movement[]>([]);

  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);

  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  readonly tab = computed<Tab>(() => readOneOf(this.params().get('tab'), TABS, 'stock'));

  /** The route param, normalised — see the note in item-form.component.ts. */
  readonly itemId = computed(() => (this.id() ?? '').trim());

  readonly item = computed<ItemDetail>(() => this.detail() ?? BLANK);

  readonly onHand = computed(() =>
    this.item().stockLevels.reduce((total, level) => total + level.qty, 0),
  );

  readonly isLow = computed(() => this.onHand() <= this.item().reorderAt);
  readonly deficit = computed(() => Math.max(0, this.item().reorderAt - this.onHand()));
  readonly usedLocations = computed(
    () => this.item().stockLevels.filter((level) => level.qty > 0).length,
  );

  constructor() {
    // Reloads whenever the route lands on a different item, so navigating
    // between two items re-fetches rather than showing the previous one.
    effect(() => {
      void this.load(this.itemId());
    });
  }

  /** Public so the error state's "Try again" can re-run it. */
  reload(): Promise<void> {
    return this.load(this.itemId());
  }

  private async load(id: string): Promise<void> {
    if (!id) {
      this.detail.set(null);
      this.movements.set([]);
      this.loading.set(false);
      this.loadError.set('No item was selected.');
      return;
    }

    this.loading.set(true);
    this.loadError.set(null);
    try {
      // Both are needed by the page whichever tab is active, and neither
      // depends on the other, so they go out together.
      const [detail, history] = await Promise.all([this.api.get(id), this.api.history(id)]);
      this.detail.set(detail);
      this.movements.set(history);
    } catch (err) {
      this.detail.set(null);
      this.movements.set([]);
      this.loadError.set(errorMessage(err));
    } finally {
      this.loading.set(false);
    }
  }
}
