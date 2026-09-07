import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Item, ItemDetail, Movement, Paginated } from '../models';
import { collectAll, toParams } from './params';

/** Body for POST /api/items and PATCH /api/items/:id. */
export interface ItemPayload {
  sku: string;
  name: string;
  description: string | null;
  unit: string;
  reorderAt: number;
}

/** Mirrors the item list's URL state, which the API filters server-side. */
export interface ItemQuery {
  q?: string;
  lowStock?: boolean;
  page?: number;
  pageSize?: number;
}

@Injectable({ providedIn: 'root' })
export class ItemsApi {
  private readonly http = inject(HttpClient);

  list(query: ItemQuery = {}): Promise<Paginated<Item>> {
    return firstValueFrom(
      this.http.get<Paginated<Item>>('/api/items', { params: toParams({ ...query }) }),
    );
  }

  /** Every matching item, for the views that show catalogue-wide totals. */
  listAll(query: Omit<ItemQuery, 'page' | 'pageSize'> = {}): Promise<Item[]> {
    return collectAll((page, pageSize) => this.list({ ...query, page, pageSize }));
  }

  get(id: string): Promise<ItemDetail> {
    return firstValueFrom(this.http.get<ItemDetail>(`/api/items/${encodeURIComponent(id)}`));
  }

  /**
   * The item's own history. Distinct from GET /api/movements, which is the
   * manager-only audit log — this one is readable by clerks.
   */
  history(id: string): Promise<Movement[]> {
    return firstValueFrom(
      this.http.get<Movement[]>(`/api/items/${encodeURIComponent(id)}/movements`),
    );
  }

  create(payload: ItemPayload): Promise<Item> {
    return firstValueFrom(this.http.post<Item>('/api/items', payload));
  }

  update(id: string, payload: Partial<ItemPayload>): Promise<Item> {
    return firstValueFrom(
      this.http.patch<Item>(`/api/items/${encodeURIComponent(id)}`, payload),
    );
  }

  /** 409 when the item has movements or stock on hand — surface it, never swallow it. */
  remove(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`/api/items/${encodeURIComponent(id)}`));
  }
}
