import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Response } from 'express';

/**
 * Translates Prisma's error codes into the HTTP contract the approved UI keys off:
 *
 *  - P2002 (unique violation)      -> 422 with a `field` so forms can attach the
 *                                     message to the offending input (sku / zone / email).
 *  - P2003 / P2014 (FK restrict)   -> 409, the "still referenced, cannot delete" case.
 *  - P2025 (record not found)      -> 404.
 *
 * Services throw domain exceptions directly for everything they can detect up
 * front; this filter is the backstop for races that only the database can catch.
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const field = this.conflictField(exception);
        response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Unprocessable Entity',
          message: `That ${field} is already taken.`,
          field,
        });
        return;
      }
      case 'P2003':
      case 'P2014': {
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          error: 'Conflict',
          message:
            'This record is still referenced by other records and cannot be deleted.',
        });
        return;
      }
      case 'P2025': {
        response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          error: 'Not Found',
          message: 'Record not found.',
        });
        return;
      }
      default: {
        this.logger.error(`Unhandled Prisma error ${exception.code}`, exception.stack);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Unexpected database error.',
        });
      }
    }
  }

  /**
   * Prisma reports the constraint's columns in `meta.target`. The UI attaches
   * duplicate errors to a specific input, so pick the field it expects:
   * a duplicate (name, zone) location surfaces on `zone`, not `name`.
   */
  private conflictField(exception: Prisma.PrismaClientKnownRequestError): string {
    const target = exception.meta?.['target'];
    const columns = Array.isArray(target)
      ? (target as string[])
      : typeof target === 'string'
        ? [target]
        : [];

    if (columns.includes('zone')) return 'zone';
    if (columns.includes('sku')) return 'sku';
    if (columns.includes('email')) return 'email';
    return columns[0] ?? 'value';
  }
}
