import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { AuthUser } from '../auth/auth-user';

/** Password hashes are never selected here — only the safe projection. */
const PUBLIC_FIELDS = { id: true, email: true, name: true, role: true } as const;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<AuthUser[]> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: PUBLIC_FIELDS,
    });
  }

  findById(id: string): Promise<AuthUser | null> {
    return this.prisma.user.findUnique({ where: { id }, select: PUBLIC_FIELDS });
  }
}
