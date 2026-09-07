import { Controller, Get, HttpStatus, Logger, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { Public } from '../auth/public.decorator';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('health')
@Public()
@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Liveness. Deliberately dependency-free: the readiness probe must not fail
   * (and restart the pod) just because the database is briefly unreachable.
   */
  @Get()
  @ApiOperation({ summary: 'Liveness probe' })
  check(): { status: string } {
    return { status: 'ok' };
  }

  /** Readiness for anything that actually needs the database. */
  @Get('deep')
  @ApiOperation({ summary: 'Liveness plus a database round-trip' })
  async deep(@Res() res: Response): Promise<void> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      res.status(HttpStatus.OK).json({ status: 'ok', db: 'up' });
    } catch (error) {
      this.logger.error('Database health check failed', error as Error);
      res
        .status(HttpStatus.SERVICE_UNAVAILABLE)
        .json({ status: 'error', db: 'down' });
    }
  }
}
