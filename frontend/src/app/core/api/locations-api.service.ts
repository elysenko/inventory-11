import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Location, Paginated } from '../models';
import { collectAll, toParams } from './params';

/** Body for POST /api/locations and PATCH /api/locations/:id. */
export interface LocationPayload {
  name: string;
  zone: string;
}

@Injectable({ providedIn: 'root' })
export class LocationsApi {
  private readonly http = inject(HttpClient);

  list(page?: number, pageSize?: number): Promise<Paginated<Location>> {
    return firstValueFrom(
      this.http.get<Paginated<Location>>('/api/locations', { params: toParams({ page, pageSize }) }),
    );
  }

  /**
   * Readable by any authenticated role — the movement form is open to clerks and
   * needs the full list to populate its from/to selects.
   */
  listAll(): Promise<Location[]> {
    return collectAll((page, pageSize) => this.list(page, pageSize));
  }

  get(id: string): Promise<Location> {
    return firstValueFrom(this.http.get<Location>(`/api/locations/${encodeURIComponent(id)}`));
  }

  create(payload: LocationPayload): Promise<Location> {
    return firstValueFrom(this.http.post<Location>('/api/locations', payload));
  }

  update(id: string, payload: Partial<LocationPayload>): Promise<Location> {
    return firstValueFrom(
      this.http.patch<Location>(`/api/locations/${encodeURIComponent(id)}`, payload),
    );
  }

  /** 409 when the location still holds stock or is referenced by a movement. */
  remove(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`/api/locations/${encodeURIComponent(id)}`));
  }
}
