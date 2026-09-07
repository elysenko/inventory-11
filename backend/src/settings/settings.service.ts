import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SETTINGS_CATALOG, findSetting, type SettingDefinition } from './settings.catalog';
import { ServiceUnconfiguredError } from './service-unconfigured.error';

/** A value equal to this sentinel counts as unset. */
export const PLACEHOLDER = 'PLACEHOLDER_CONFIGURE_IN_SETTINGS';

/**
 * Matches frontend core/models.ts `SettingEntry`, plus `source` so the panel can
 * tell an admin why an edit did not take effect: an env-provisioned value wins
 * over a saved override, and the UI can mark those rows read-only.
 */
export interface SettingEntry {
  key: string;
  service: string;
  label: string;
  /** Masked for secrets; '' when unconfigured. Never the raw secret. */
  value: string;
  configured: boolean;
  /** Which layer supplied the effective value. */
  source: 'env' | 'db' | null;
}

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Resolution order: environment variable (including known aliases), then the
   * SystemSetting row an admin saved, then null. A value equal to PLACEHOLDER
   * counts as unset at every layer.
   */
  async resolveConfig(key: string): Promise<string | null> {
    const definition = findSetting(key);
    const envKeys = [definition?.key ?? key, ...(definition?.aliases ?? [])];

    for (const envKey of envKeys) {
      const value = process.env[envKey]?.trim();
      if (value && value !== PLACEHOLDER) return value;
    }

    const row = await this.prisma.systemSetting.findUnique({
      where: { key: definition?.key ?? key },
    });
    const stored = row?.value?.trim();
    return stored && stored !== PLACEHOLDER ? stored : null;
  }

  /** resolveConfig, but throws a 503 instead of returning null. */
  async requireConfig(key: string): Promise<string> {
    const value = await this.resolveConfig(key);
    if (value === null) throw new ServiceUnconfiguredError(key);
    return value;
  }

  async findAll(): Promise<SettingEntry[]> {
    const rows = await this.prisma.systemSetting.findMany();
    const stored = new Map(rows.map((row) => [row.key, row.value]));

    return SETTINGS_CATALOG.map((definition) => {
      const resolved = this.resolveWith(definition, stored);
      return {
        key: definition.key,
        service: definition.service,
        label: definition.label,
        value: resolved.value === null ? '' : this.present(definition, resolved.value),
        configured: resolved.value !== null,
        source: resolved.source,
      };
    });
  }

  /**
   * Accepts the changed subset the settings panel submits: `{ KEY: value }`.
   * Unknown keys are rejected rather than silently stored, so a typo surfaces
   * instead of creating a row nothing will ever read.
   */
  async update(patch: Record<string, unknown>): Promise<SettingEntry[]> {
    if (patch === null || typeof patch !== 'object' || Array.isArray(patch)) {
      throw new BadRequestException('Body must be an object of setting key/value pairs.');
    }
    const entries = Object.entries(patch);
    if (entries.length === 0) {
      throw new BadRequestException('Body must contain at least one setting.');
    }

    // Validate the whole patch before writing any of it, so a bad key cannot
    // leave half the batch applied.
    const resolved = entries.map(([key, raw]) => {
      const definition = findSetting(key);
      if (!definition) throw new BadRequestException(`Unknown setting key: ${key}`);
      if (definition.readOnly) {
        throw new BadRequestException(
          `${definition.key} is read at startup and cannot be changed here; set it in the environment.`,
        );
      }
      if (typeof raw !== 'string') {
        throw new BadRequestException(`Setting ${definition.key} must be a string.`);
      }
      return { key: definition.key, value: raw.trim() };
    });

    for (const { key, value } of resolved) {
      // Empty or the sentinel means "clear this override" — drop the row so the
      // environment (if any) becomes the effective value again.
      if (value === '' || value === PLACEHOLDER) {
        await this.prisma.systemSetting.deleteMany({ where: { key } });
        continue;
      }

      await this.prisma.systemSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }

    return this.findAll();
  }

  /** Same precedence as resolveConfig, but over an already-loaded row map. */
  private resolveWith(
    definition: SettingDefinition,
    stored: Map<string, string>,
  ): { value: string | null; source: 'env' | 'db' | null } {
    for (const envKey of [definition.key, ...(definition.aliases ?? [])]) {
      const value = process.env[envKey]?.trim();
      if (value && value !== PLACEHOLDER) return { value, source: 'env' };
    }
    const value = stored.get(definition.key)?.trim();
    return value && value !== PLACEHOLDER
      ? { value, source: 'db' }
      : { value: null, source: null };
  }

  /**
   * Secrets never leave the server in clear text. A connection string keeps its
   * shape so an admin can recognise which database it points at, with only the
   * password blanked.
   */
  private present(definition: SettingDefinition, value: string): string {
    if (!definition.secret) return value;
    if (definition.key === 'DATABASE_URL') return this.maskUrlPassword(value);
    return '••••••••••••••••';
  }

  private maskUrlPassword(value: string): string {
    try {
      const url = new URL(value);
      // Redact with a run of bullet characters sized off the original secret's
      // length, not a fixed credential-shaped literal, then swap it in.
      const redaction = '•'.repeat(Math.max(url.password.length, 1));
      if (url.password) url.password = redaction;
      return decodeURIComponent(url.toString());
    } catch {
      return '••••••••••••••••';
    }
  }
}
