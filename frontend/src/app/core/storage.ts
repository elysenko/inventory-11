/**
 * Namespaced browser storage.
 *
 * Two different namespaces, because the two environments need opposite things:
 *
 * - Preview: mockups are served many-per-origin under /<mockup_id>/ and storage is
 *   origin-scoped, not path-scoped, so an unprefixed `user` key would collide with
 *   every other mockup the reviewer has open. There the first path segment is the
 *   mockup id — stable for the whole session — so it makes a good prefix.
 *
 * - Deployed: the app owns its origin and the first path segment is the *route*
 *   (`/login`, `/items`, `/movements`). Prefixing by it would file the token written
 *   at `/login` under `login:token` and then look for `items:token` on the next cold
 *   load, silently signing the user out on every refresh and every deep link. A fixed
 *   prefix is what keeps a session alive across navigations.
 */
const APP_NS = 'stockroom';

const NS = COLOSSUS_PREVIEW
  ? (typeof location !== 'undefined' && location.pathname.split('/')[1]) || APP_NS
  : APP_NS;

export const nsKey = (key: string): string => `${NS}:${key}`;

export function readRaw(key: string): string | null {
  try {
    return localStorage.getItem(nsKey(key));
  } catch {
    return null;
  }
}

export function writeRaw(key: string, value: string): void {
  try {
    localStorage.setItem(nsKey(key), value);
  } catch {
    /* storage unavailable (private mode / quota) — the app stays usable without it */
  }
}

export function removeKeys(...keys: string[]): void {
  for (const key of keys) {
    try {
      localStorage.removeItem(nsKey(key));
    } catch {
      /* ignore */
    }
  }
}

/**
 * Reads and validates a JSON value. Anything unrecognised is treated as corrupt:
 * the key is cleared and `null` returned, so a bad payload can never blank the page.
 */
export function readJson<T>(key: string, isValid: (value: unknown) => value is T): T | null {
  const raw = readRaw(key);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (isValid(parsed)) return parsed;
  } catch {
    /* fall through to the cleanup below */
  }
  removeKeys(key);
  return null;
}

export function writeJson(key: string, value: unknown): void {
  try {
    writeRaw(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}
