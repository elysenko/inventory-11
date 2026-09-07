import { HttpErrorResponse } from '@angular/common/http';

/**
 * A server rejection, normalised into something a component can render.
 *
 * Nest answers with `{ statusCode, error, message, field? }`, where `message` is
 * a string for a thrown HttpException and a string[] for a ValidationPipe
 * failure. `field` is set by the handlers that scope an error to one input
 * (duplicate SKU -> `sku`, duplicate name/zone pair -> `zone`), which is what
 * lets a form attach the message to the offending control instead of dumping it
 * at the top.
 */
export interface ApiProblem {
  status: number;
  message: string;
  /** The form control the message belongs against, when the server named one. */
  field: string | null;
}

/**
 * Status 0 means the request never reached the API (offline, DNS, CORS, the
 * backend pod not up yet) — it is not a server response, so it gets its own copy
 * rather than a generic "something went wrong".
 */
const FALLBACK: Record<number, string> = {
  0: 'Cannot reach the StockRoom API. Check your connection and try again.',
  400: 'Some of those details were rejected. Check the form and try again.',
  401: 'Your session has expired. Sign in again to continue.',
  403: 'You do not have permission to do that.',
  404: 'That record no longer exists.',
  409: 'That change conflicts with data already recorded.',
  422: 'Some of those details were rejected. Check the form and try again.',
  500: 'The server hit an unexpected error. Try again in a moment.',
  503: 'That service is not configured yet. An administrator can set it up under Settings.',
};

const GENERIC = 'Something went wrong. Try again in a moment.';

function readBody(body: unknown): { message: string | null; field: string | null } {
  if (typeof body === 'string') return { message: body.trim() || null, field: null };
  if (typeof body !== 'object' || body === null) return { message: null, field: null };

  const record = body as { message?: unknown; field?: unknown };
  const field = typeof record.field === 'string' ? record.field : null;

  // ValidationPipe returns every failing constraint; the first is the one the
  // user is most likely looking at, and stacking all of them reads as noise.
  if (Array.isArray(record.message)) {
    const first = record.message.find((entry): entry is string => typeof entry === 'string');
    return { message: first ?? null, field };
  }
  if (typeof record.message === 'string') {
    return { message: record.message.trim() || null, field };
  }
  return { message: null, field };
}

/** Never throws and never returns an empty message — safe to render directly. */
export function toProblem(error: unknown): ApiProblem {
  if (error instanceof HttpErrorResponse) {
    const { message, field } = readBody(error.error);
    return {
      status: error.status,
      message: message ?? FALLBACK[error.status] ?? GENERIC,
      field,
    };
  }
  if (error instanceof Error && error.message.trim()) {
    return { status: 0, message: error.message, field: null };
  }
  return { status: 0, message: GENERIC, field: null };
}

/** Shorthand for the common `catch (err) { this.error.set(errorMessage(err)); }`. */
export function errorMessage(error: unknown): string {
  return toProblem(error).message;
}
