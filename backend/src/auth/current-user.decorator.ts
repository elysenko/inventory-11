import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { AuthUser } from './auth-user';

/** Injects the JWT-derived principal into a controller handler. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser =>
    ctx.switchToHttp().getRequest<{ user: AuthUser }>().user,
);
