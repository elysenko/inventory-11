import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SettingEntry } from '../models';

@Injectable({ providedIn: 'root' })
export class SettingsApi {
  private readonly http = inject(HttpClient);

  /** Admin-only. Secrets come back masked — never in clear text. */
  list(): Promise<SettingEntry[]> {
    return firstValueFrom(this.http.get<SettingEntry[]>('/api/admin/settings'));
  }

  /**
   * Saves the changed subset only. The server rejects an unknown key and a
   * boot-time key (DATABASE_URL, JWT_SECRET) with a 400 rather than storing a
   * row nothing will ever read.
   */
  update(patch: Record<string, string>): Promise<SettingEntry[]> {
    return firstValueFrom(this.http.patch<SettingEntry[]>('/api/admin/settings', patch));
  }
}
