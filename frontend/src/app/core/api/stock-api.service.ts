import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

/** `${itemId}|${locationId}` -> units on hand. Rows at zero are omitted. */
export type BalanceMap = Record<string, number>;

@Injectable({ providedIn: 'root' })
export class StockApi {
  private readonly http = inject(HttpClient);

  /**
   * Powers the movement form's "N units currently held there" hint.
   *
   * Advisory only: the authoritative check runs under a row lock inside the
   * movement transaction, so a stale hint can never let an overdraw through —
   * the server still answers 422 and writes nothing.
   */
  balances(): Promise<BalanceMap> {
    return firstValueFrom(this.http.get<BalanceMap>('/api/stock/balances'));
  }
}
