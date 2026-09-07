import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SettingsApi } from '../../../core/api/settings-api.service';
import { errorMessage } from '../../../core/api/api-error';
import { SettingEntry } from '../../../core/models';

/** A value equal to this sentinel counts as unset, matching the server. */
const PLACEHOLDER = 'PLACEHOLDER_CONFIGURE_IN_SETTINGS';

interface ServiceGroup {
  service: string;
  title: string;
  blurb: string;
  entries: SettingEntry[];
}

/**
 * Presentation for the services the API can return. An unknown service still
 * renders — it falls back to its own key rather than disappearing from the panel.
 */
const SERVICE_COPY: Record<string, { title: string; blurb: string }> = {
  postgresql: {
    title: 'PostgreSQL',
    blurb: 'Backs the item catalogue, stock levels and the movement ledger.',
  },
  minio: {
    title: 'MinIO object storage',
    blurb: 'Provisioned for future attachments. StockRoom does not upload anything yet.',
  },
};

@Component({
  selector: 'app-settings',
  imports: [FormsModule, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private readonly api = inject(SettingsApi);

  readonly placeholder = PLACEHOLDER;

  readonly settings = signal<SettingEntry[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);

  readonly drafts = signal<Record<string, string>>({});
  readonly savedKey = signal<string | null>(null);
  readonly savingKey = signal<string | null>(null);
  readonly saveError = signal<{ service: string; message: string } | null>(null);

  /** Groups follow the order the API returns, so the catalogue drives the layout. */
  readonly groups = computed<ServiceGroup[]>(() => {
    const order: string[] = [];
    const byService = new Map<string, SettingEntry[]>();

    for (const entry of this.settings()) {
      if (!byService.has(entry.service)) {
        byService.set(entry.service, []);
        order.push(entry.service);
      }
      byService.get(entry.service)!.push(entry);
    }

    return order.map((service) => ({
      service,
      title: SERVICE_COPY[service]?.title ?? service,
      blurb: SERVICE_COPY[service]?.blurb ?? 'Credentials for this service.',
      entries: byService.get(service) ?? [],
    }));
  });

  readonly unconfigured = computed(() =>
    this.groups().filter((group) => group.entries.some((entry) => !entry.configured)),
  );

  constructor() {
    void this.reload();
  }

  async reload(): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    try {
      this.settings.set(await this.api.list());
      // Drafts describe the previous payload; a fresh load supersedes them.
      this.drafts.set({});
    } catch (err) {
      this.settings.set([]);
      this.loadError.set(errorMessage(err));
    } finally {
      this.loading.set(false);
    }
  }

  isConfigured(group: ServiceGroup): boolean {
    return group.entries.every((entry) => entry.configured);
  }

  draftFor(entry: SettingEntry): string {
    return this.drafts()[entry.key] ?? (entry.configured ? entry.value : '');
  }

  setDraft(key: string, value: string): void {
    this.drafts.update((drafts) => ({ ...drafts, [key]: value }));
  }

  errorFor(group: ServiceGroup): string | null {
    const error = this.saveError();
    return error && error.service === group.service ? error.message : null;
  }

  /**
   * Sends only what actually changed.
   *
   * Configured secrets come back masked, so submitting an untouched field would
   * store the mask as the real value. A field is therefore only included when
   * the admin typed something different from what was rendered.
   */
  async save(group: ServiceGroup): Promise<void> {
    this.savedKey.set(null);
    this.saveError.set(null);

    const drafts = this.drafts();
    const patch: Record<string, string> = {};

    for (const entry of group.entries) {
      const draft = drafts[entry.key];
      if (draft === undefined) continue;
      const value = draft.trim();
      if (value === PLACEHOLDER) continue;
      if (value === (entry.configured ? entry.value : '')) continue;
      patch[entry.key] = value;
    }

    if (Object.keys(patch).length === 0) {
      this.saveError.set({
        service: group.service,
        message: 'Nothing to save — change a value first.',
      });
      return;
    }

    this.savingKey.set(group.service);
    try {
      this.settings.set(await this.api.update(patch));
      // Only the saved group's drafts are cleared, so an edit in progress
      // elsewhere on the page survives.
      this.drafts.update((current) => {
        const next = { ...current };
        for (const key of Object.keys(patch)) delete next[key];
        return next;
      });
      this.savedKey.set(group.service);
    } catch (err) {
      // Keys read at boot (DATABASE_URL, JWT_SECRET) are refused with a 400
      // explaining they must be set in the environment — shown, not swallowed.
      this.saveError.set({ service: group.service, message: errorMessage(err) });
    } finally {
      this.savingKey.set(null);
    }
  }
}
