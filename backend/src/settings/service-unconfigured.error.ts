import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Thrown when a feature needs a third-party credential that is not configured.
 *
 * Third-party keys are never required at boot — a missing one degrades that one
 * feature to a 503 at call time instead of crash-looping the pod.
 */
export class ServiceUnconfiguredError extends HttpException {
  constructor(key: string) {
    super(
      {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        error: 'Service Unavailable',
        message: `${key} is not configured. An administrator can set it in Settings.`,
        key,
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
