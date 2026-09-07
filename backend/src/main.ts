import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Every route lives under /api — nginx proxies exactly that prefix through
  // to this service, so the SPA and the API share one origin.
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      // Strip unknown properties rather than rejecting them: the forms post a
      // few view-only fields, and silently dropping them beats a 400.
      whitelist: true,
      transform: true,
      validationError: { target: false, value: false },
    }),
  );

  // The SPA is served same-origin through nginx in every deployed environment,
  // so CORS only matters for `ng serve`. Auth is a bearer token in
  // localStorage, never a cookie, so reflecting the origin carries no CSRF risk.
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.enableShutdownHooks();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('StockRoom API')
    .setDescription('Inventory catalogue, stock movements and reporting.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  // Default matches colossus.yaml `backend.port`.
  const port = Number.parseInt(process.env.PORT ?? '3001', 10);
  await app.listen(port, '0.0.0.0');
  logger.log(`StockRoom API listening on :${port} (docs at /api/docs)`);
}

void bootstrap();
