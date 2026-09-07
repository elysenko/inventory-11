import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LowStockRow } from '../../../core/models';

@Component({
  selector: 'app-low-stock',
  imports: [RouterLink],
  templateUrl: './low-stock.component.html',
  styleUrl: './low-stock.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LowStockComponent {
  /** Ordered by (total − reorderAt) ascending: the worst deficit first. */
  readonly rows = signal<LowStockRow[]>([
    { itemId: 'itm-007', sku: 'SKU-007', name: 'Corrugated carton 400mm', unit: 'ea', totalQty: 96, reorderAt: 150, deficit: 54 },
    { itemId: 'itm-002', sku: 'SKU-002', name: 'M8 hex bolt, 100 pack', unit: 'box', totalQty: 18, reorderAt: 25, deficit: 7 },
    { itemId: 'itm-008', sku: 'SKU-008', name: 'Forklift hydraulic oil 20L', unit: 'drum', totalQty: 3, reorderAt: 8, deficit: 5 },
    { itemId: 'itm-004', sku: 'SKU-004', name: 'Pallet wrap core', unit: 'ea', totalQty: 0, reorderAt: 4, deficit: 4 },
    { itemId: 'itm-005', sku: 'SKU-005', name: 'Thermal label 4×6, 1000 pack', unit: 'box', totalQty: 20, reorderAt: 20, deficit: 0 },
  ]);

  readonly criticalCount = computed(() => this.rows().filter((row) => row.totalQty === 0).length);
  readonly totalDeficit = computed(() =>
    this.rows().reduce((total, row) => total + row.deficit, 0),
  );
}
