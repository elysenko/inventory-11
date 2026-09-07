import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import type { AuthUser, JwtPayload } from './auth-user';

/** Matches prisma/seed/seed.js, which hashes platform logins at this cost. */
const BCRYPT_ROUNDS = 10;

/** Shape the Angular AuthService stores verbatim (core/auth.service.ts). */
export interface AuthResult {
  accessToken: string;
  user: AuthUser;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<AuthResult> {
    // Matched case-insensitively: the DTO normalises what the user typed, but
    // prisma/seed/seed.js stores platform emails exactly as Colossus supplied
    // them, so a minted address with capitals must still be able to log in.
    const user = await this.prisma.user.findFirst({
      where: { email: { equals: dto.email, mode: 'insensitive' } },
    });

    // Same message and status for "no such user" and "wrong password" so the
    // endpoint cannot be used to enumerate which accounts exist.
    const invalid = new UnauthorizedException('Incorrect email or password.');
    if (!user) throw invalid;

    const matches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!matches) throw invalid;

    return this.issue(user);
  }

  /**
   * Self-service registration. New accounts are always clerks (Role.USER) —
   * elevated roles are platform-minted through the Colossus accounts seed,
   * never obtainable by signing up.
   */
  async signup(dto: SignupDto): Promise<AuthResult> {
    const existing = await this.prisma.user.findFirst({
      where: { email: { equals: dto.email, mode: 'insensitive' } },
      select: { id: true },
    });
    if (existing) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        error: 'Unprocessable Entity',
        message: 'An account with that email already exists.',
        field: 'email',
      });
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name?.trim() || null,
        passwordHash: await bcrypt.hash(dto.password, BCRYPT_ROUNDS),
        role: Role.USER,
      },
    });

    return this.issue(user);
  }

  private issue(user: {
    id: string;
    email: string;
    name: string | null;
    role: Role;
  }): AuthResult {
    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwt.sign(payload),
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
  }
}
