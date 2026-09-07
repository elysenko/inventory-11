import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LowStockRow } from '../models';

@Injectable({ providedIn: 'root' })
export class ReportsApi {
  private readonly http = inject(HttpClient);

  /** Manager-only. Already sorted worst-deficit-first by the server. */
  lowStock(): Promise<LowStockRow[]> {
    return firstValueFrom(this.http.get<LowStockRow[]>('/api/reports/low-stock'));
  }
}
