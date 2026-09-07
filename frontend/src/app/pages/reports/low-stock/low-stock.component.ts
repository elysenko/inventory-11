import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReportsApi } from '../../../core/api/reports-api.service';
import { errorMessage } from '../../../core/api/api-error';
import { LowStockRow } from '../../../core/models';

@Component({
  selector: 'app-low-stock',
  imports: [RouterLink],
  templateUrl: './low-stock.component.html',
  styleUrl: './low-stock.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LowStockComponent {
  private readonly api = inject(ReportsApi);

  /** Ordered by (total − reorderAt) ascending: the worst deficit first. */
  readonly rows = signal<LowStockRow[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);

  readonly criticalCount = computed(() => this.rows().filter((row) => row.totalQty === 0).length);
  readonly totalDeficit = computed(() =>
    this.rows().reduce((total, row) => total + row.deficit, 0),
  );

  constructor() {
    void this.reload();
  }

  async reload(): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    try {
      this.rows.set(await this.api.lowStock());
    } catch (err) {
      this.rows.set([]);
      this.loadError.set(errorMessage(err));
    } finally {
      this.loading.set(false);
    }
  }
}
