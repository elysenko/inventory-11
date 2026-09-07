import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthUser, ROLE_RANK, Role } from './models';
import { readJson, removeKeys, readRaw, writeJson, writeRaw } from './storage';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';

interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

function isAuthUser(value: unknown): value is AuthUser {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<AuthUser>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.role === 'string' &&
    candidate.role in ROLE_RANK
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Local, synchronous credential shape check. Never a network call. */
export function validateCredentials(email: string, password: string): string | null {
  if (!email.trim() || !password.trim()) return 'Enter your email address and password to continue.';
  if (!EMAIL_RE.test(email.trim())) return 'That does not look like a valid email address.';
  if (password.trim().length < 4) return 'Your password must be at least 4 characters.';
  return null;
}

function displayNameFor(email: string): string {
  const handle = email.split('@')[0] ?? 'user';
  return handle
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly currentUser = signal<AuthUser | null>(this.restore());

  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isManager = computed(() => this.hasRank('MANAGER'));
  readonly isAdmin = computed(() => this.hasRank('ADMIN'));

  token(): string | null {
    return readRaw(TOKEN_KEY);
  }

  hasRole(allowed: readonly Role[]): boolean {
    const role = this.currentUser()?.role;
    return role !== undefined && allowed.includes(role);
  }

  async login(email: string, password: string): Promise<void> {
    if (COLOSSUS_PREVIEW) {
      const problem = validateCredentials(email, password);
      if (problem) throw new Error(problem);
      const address = email.trim().toLowerCase();
      this.setSession(
        { id: 'usr-preview', email: address, name: displayNameFor(address), role: 'ADMIN' },
        'preview-session',
      );
      return;
    }
    const res = await firstValueFrom(
      this.http.post<LoginResponse>('/api/auth/login', { email, password }),
    );
    this.setSession(res.user, res.accessToken);
  }

  async signup(name: string, email: string, password: string): Promise<void> {
    if (COLOSSUS_PREVIEW) {
      const problem = validateCredentials(email, password);
      if (problem) throw new Error(problem);
      const address = email.trim().toLowerCase();
      this.setSession(
        { id: 'usr-preview', email: address, name: name.trim() || displayNameFor(address), role: 'ADMIN' },
        'preview-session',
      );
      return;
    }
    const res = await firstValueFrom(
      this.http.post<LoginResponse>('/api/auth/signup', { name, email, password }),
    );
    this.setSession(res.user, res.accessToken);
  }

  /**
   * Preview-only: seeds a signed-in session without any credentials so the reviewer
   * (and the screenshot capture system) can reach the authenticated screens directly.
   */
  previewSignIn(role: Role = 'ADMIN'): void {
    if (!COLOSSUS_PREVIEW) return;
    this.setSession(
      { id: 'usr-preview', email: 'dana.whitfield@stockroom.example', name: 'Dana Whitfield', role },
      'preview-session',
    );
  }

  /** Preview-only: re-badge the session so role-gated UI can be reviewed. */
  previewSwitchRole(role: Role): void {
    if (!COLOSSUS_PREVIEW) return;
    const user = this.currentUser();
    this.setSession({ ...(user ?? { id: 'usr-preview', email: 'dana.whitfield@stockroom.example', name: 'Dana Whitfield' }), role }, 'preview-session');
  }

  logout(): void {
    this.currentUser.set(null);
    removeKeys(USER_KEY, TOKEN_KEY);
  }

  private hasRank(minimum: Role): boolean {
    const role = this.currentUser()?.role;
    return role !== undefined && ROLE_RANK[role] >= ROLE_RANK[minimum];
  }

  private setSession(user: AuthUser, token: string): void {
    this.currentUser.set(user);
    writeJson(USER_KEY, user);
    writeRaw(TOKEN_KEY, token);
  }

  /** Defensive restore: an unrecognised payload is cleared, never thrown. */
  private restore(): AuthUser | null {
    try {
      return readJson<AuthUser>(USER_KEY, isAuthUser);
    } catch {
      removeKeys(USER_KEY, TOKEN_KEY);
      return null;
    }
  }
}
