import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Movement, MovementType, Paginated } from '../models';
import { collectAll, toParams } from './params';

/** Body for POST /api/movements. Unused locations are omitted, not sent blank. */
export interface MovementPayload {
  type: MovementType;
  itemId: string;
  fromLocId?: string;
  toLocId?: string;
  qty: number;
  note?: string;
}

/** Mirrors the audit log's URL state: `?itemId=&type=&from=&to=&page=`. */
export interface MovementQuery {
  itemId?: string;
  type?: string;
  /** `YYYY-MM-DD`, inclusive from the start of that UTC day. */
  from?: string;
  /** `YYYY-MM-DD`, inclusive through the end of that UTC day. */
  to?: string;
  page?: number;
  pageSize?: number;
}

@Injectable({ providedIn: 'root' })
export class MovementsApi {
  private readonly http = inject(HttpClient);

  /** Manager-only: a clerk gets a 403 here even though they can record movements. */
  list(query: MovementQuery = {}): Promise<Paginated<Movement>> {
    return firstValueFrom(
      this.http.get<Paginated<Movement>>('/api/movements', { params: toParams({ ...query }) }),
    );
  }

  listAll(query: Omit<MovementQuery, 'page' | 'pageSize'> = {}): Promise<Movement[]> {
    return collectAll((page, pageSize) => this.list({ ...query, page, pageSize }));
  }

  /**
   * Records a movement. The balance update and the ledger row happen in one
   * server-side transaction, so a 422 ("Insufficient stock") means nothing at
   * all was written and the stored balance is untouched.
   */
  create(payload: MovementPayload): Promise<Movement> {
    return firstValueFrom(this.http.post<Movement>('/api/movements', payload));
  }
}
