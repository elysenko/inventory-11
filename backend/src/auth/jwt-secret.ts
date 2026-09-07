import { Logger } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import type { SignOptions } from 'jsonwebtoken';

let cached: string | null = null;

/**
 * Resolves the JWT signing secret once per process.
 *
 * JWT_SECRET is app-owned config the platform always provisions, so it is
 * expected to be present. It is deliberately NOT hard-required: a missing
 * secret degrades to an ephemeral per-process key (tokens stop surviving a
 * restart) and logs loudly, rather than crash-looping the pod. There is no
 * hardcoded fallback value — an attacker-known default would be worse than
 * either alternative.
 */
export function jwtSecret(): string {
  if (cached) return cached;

  const configured = process.env.JWT_SECRET?.trim();
  if (configured) {
    cached = configured;
    return cached;
  }

  cached = randomBytes(48).toString('hex');
  new Logger('JwtSecret').error(
    'JWT_SECRET is not set. Falling back to an ephemeral per-process secret — ' +
      'issued tokens will be invalidated on restart. Set JWT_SECRET in the environment.',
  );
  return cached;
}

const DEFAULT_EXPIRES_IN = '12h';
/** `ms`-style span, e.g. "12h", "1d", "30m", or a bare number of seconds. */
const SPAN_PATTERN = /^\d+(\.\d+)?\s*(ms|s|m|h|d|w|y)?$/i;

/**
 * Token lifetime. jsonwebtoken only validates `expiresIn` when it signs, so an
 * unparseable value would boot fine and then 500 every single login. Checking
 * the shape here turns that into one startup warning and a safe default.
 *
 * The cast is unavoidable: jsonwebtoken types this as a template-literal union
 * that a runtime string cannot be narrowed to.
 */
export function jwtExpiresIn(): SignOptions['expiresIn'] {
  const configured =
    process.env.JWT_EXPIRES_IN?.trim() || process.env.JWT_EXPIRATION?.trim() || '';

  if (!configured) return DEFAULT_EXPIRES_IN as SignOptions['expiresIn'];

  if (!SPAN_PATTERN.test(configured)) {
    new Logger('JwtSecret').warn(
      `JWT_EXPIRES_IN="${configured}" is not a valid time span — falling back to ${DEFAULT_EXPIRES_IN}.`,
    );
    return DEFAULT_EXPIRES_IN as SignOptions['expiresIn'];
  }

  return configured as SignOptions['expiresIn'];
}
