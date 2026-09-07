/**
 * Every key the admin settings panel can show, grouped by the service it
 * belongs to. `service` and `label` match the approved UI, which groups rows by
 * `service` ('postgresql' -> "PostgreSQL", 'minio' -> "MinIO object storage").
 */
export interface SettingDefinition {
  key: string;
  service: string;
  label: string;
  /** Secrets are never returned in clear text — only a masked preview. */
  secret: boolean;
  /**
   * Env vars carrying the same value under a different name. The platform
   * provisions MinIO as MINIO_ROOT_USER / MINIO_ROOT_PASSWORD, while the app
   * refers to access/secret keys.
   */
  aliases?: string[];
  /**
   * Read at boot and cached (the Prisma connection, the JWT signing key), so a
   * value saved here could never take effect. Surfaced for visibility but
   * refused on write rather than silently ignored.
   */
  readOnly?: boolean;
}

export const SETTINGS_CATALOG: readonly SettingDefinition[] = [
  {
    key: 'DATABASE_URL',
    service: 'postgresql',
    label: 'Connection string',
    secret: true,
    readOnly: true,
  },
  {
    key: 'JWT_SECRET',
    service: 'postgresql',
    label: 'JWT signing secret',
    secret: true,
    readOnly: true,
  },
  {
    key: 'MINIO_ENDPOINT',
    service: 'minio',
    label: 'Endpoint',
    secret: false,
  },
  {
    key: 'MINIO_ACCESS_KEY',
    service: 'minio',
    label: 'Access key',
    secret: false,
    aliases: ['MINIO_ROOT_USER'],
  },
  {
    key: 'MINIO_SECRET_KEY',
    service: 'minio',
    label: 'Secret key',
    secret: true,
    aliases: ['MINIO_ROOT_PASSWORD'],
  },
];

const BY_UPPER_KEY = new Map(
  SETTINGS_CATALOG.map((entry) => [entry.key.toUpperCase(), entry]),
);

/**
 * Keys are matched case-insensitively so a client sending `minio_access_key`
 * resolves to the canonical `MINIO_ACCESS_KEY` rather than being rejected as
 * unknown or written as a second, never-read row.
 */
export function findSetting(key: string): SettingDefinition | undefined {
  return BY_UPPER_KEY.get(key.trim().toUpperCase());
}
