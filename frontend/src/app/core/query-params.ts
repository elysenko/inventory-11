import { Params, Router } from '@angular/router';

/**
 * Every list filter round-trips through the URL, so a filtered view is deep-linkable
 * and restorable. These helpers coerce the string-only query param map.
 */
export function readNumber(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

export function readBoolean(value: string | null): boolean {
  return value === 'true' || value === '1';
}

export function readText(value: string | null): string {
  return (value ?? '').trim();
}

export function readOneOf<T extends string>(
  value: string | null,
  allowed: readonly T[],
  fallback: T,
): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

/** Empty strings and false-y flags are dropped so URLs stay clean and shareable. */
export function cleanParams(params: Record<string, string | number | boolean | null>): Params {
  const out: Params = {};
  for (const [key, value] of Object.entries(params)) {
    out[key] = value === '' || value === null || value === false ? null : value;
  }
  return out;
}

export function mergeQueryParams(
  router: Router,
  params: Record<string, string | number | boolean | null>,
): void {
  void router.navigate([], {
    queryParams: cleanParams(params),
    queryParamsHandling: 'merge',
    replaceUrl: true,
  });
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
