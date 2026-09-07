import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SettingEntry } from '../../../core/models';

const PLACEHOLDER = 'PLACEHOLDER_CONFIGURE_IN_SETTINGS';

interface ServiceGroup {
  service: string;
  title: string;
  blurb: string;
  entries: SettingEntry[];
}

@Component({
  selector: 'app-settings',
  imports: [FormsModule, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  readonly placeholder = PLACEHOLDER;

  readonly settings = signal<SettingEntry[]>([
    { key: 'DATABASE_URL', service: 'postgresql', label: 'Connection string', value: 'postgresql://stockroom:••••••••@app-db-postgresql:5432/stockroom', configured: true },
    { key: 'JWT_SECRET', service: 'postgresql', label: 'JWT signing secret', value: '••••••••••••••••', configured: true },
    { key: 'MINIO_ENDPOINT', service: 'minio', label: 'Endpoint', value: PLACEHOLDER, configured: false },
    { key: 'MINIO_ACCESS_KEY', service: 'minio', label: 'Access key', value: PLACEHOLDER, configured: false },
    { key: 'MINIO_SECRET_KEY', service: 'minio', label: 'Secret key', value: PLACEHOLDER, configured: false },
  ]);

  readonly drafts = signal<Record<string, string>>({});
  readonly savedKey = signal<string | null>(null);

  readonly groups = computed<ServiceGroup[]>(() => [
    {
      service: 'postgresql',
      title: 'PostgreSQL',
      blurb: 'Backs the item catalogue, stock levels and the movement ledger.',
      entries: this.settings().filter((entry) => entry.service === 'postgresql'),
    },
    {
      service: 'minio',
      title: 'MinIO object storage',
      blurb: 'Provisioned for future attachments. StockRoom does not upload anything yet.',
      entries: this.settings().filter((entry) => entry.service === 'minio'),
    },
  ]);

  readonly unconfigured = computed(() =>
    this.groups().filter((group) => group.entries.some((entry) => !entry.configured)),
  );

  isConfigured(group: ServiceGroup): boolean {
    return group.entries.every((entry) => entry.configured);
  }

  draftFor(entry: SettingEntry): string {
    return this.drafts()[entry.key] ?? (entry.configured ? entry.value : '');
  }

  setDraft(key: string, value: string): void {
    this.drafts.update((drafts) => ({ ...drafts, [key]: value }));
  }

  save(group: ServiceGroup): void {
    const drafts = this.drafts();
    this.settings.update((entries) =>
      entries.map((entry) => {
        if (entry.service !== group.service) return entry;
        const draft = drafts[entry.key];
        if (draft === undefined || draft.trim() === '' || draft.trim() === PLACEHOLDER) return entry;
        return { ...entry, value: draft.trim(), configured: true };
      }),
    );
    this.savedKey.set(group.service);
  }
}
