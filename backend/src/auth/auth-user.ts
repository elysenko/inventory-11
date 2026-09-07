import { Role } from '@prisma/client';

/** The authenticated principal attached to `request.user` by JwtStrategy. */
export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: Role;
}

/** JWT claim set. `sub` is the user id. */
export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}
