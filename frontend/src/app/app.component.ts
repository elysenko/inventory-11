import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { AuthService } from './core/auth.service';
import { ROLE_LABEL, Role } from './core/models';

interface NavItem {
  label: string;
  hint: string;
  icon: string;
  path: string;
  exact: boolean;
  minRole: Role;
}

const NAV: NavItem[] = [
  { label: 'Items', hint: 'Catalogue & stock on hand', icon: '▣', path: '/items', exact: false, minRole: 'USER' },
  { label: 'Record movement', hint: 'Book stock in, out or across', icon: '⇄', path: '/movements/new', exact: true, minRole: 'USER' },
  { label: 'Movement log', hint: 'Full audit history', icon: '≡', path: '/movements', exact: true, minRole: 'MANAGER' },
  { label: 'Low stock', hint: 'Items at or below reorder point', icon: '⚠', path: '/reports/low-stock', exact: false, minRole: 'MANAGER' },
  { label: 'Locations', hint: 'Zones & storage areas', icon: '⌗', path: '/locations', exact: false, minRole: 'MANAGER' },
  { label: 'Settings', hint: 'Service credentials', icon: '⚙', path: '/admin/settings', exact: false, minRole: 'ADMIN' },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly previewShortcuts = COLOSSUS_PREVIEW;
  readonly roleOptions: Role[] = ['USER', 'MANAGER', 'ADMIN'];
  readonly roleLabel = ROLE_LABEL;

  readonly drawerOpen = signal(false);
  readonly menuOpen = signal(false);

  constructor() {
    // The cached user is whatever /api/auth/login returned; re-reading /api/auth/me
    // on boot means a role changed server-side takes effect on the next load
    // rather than lingering until the token expires.
    void this.auth.refresh();
  }

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** Auth screens render standalone — no chrome around the brand block. */
  readonly bare = computed(() => {
    const path = this.url().split('?')[0] ?? '';
    return path.startsWith('/login') || path.startsWith('/signup');
  });

  /** The signed-in user, but only when the current route should be wrapped in chrome. */
  readonly chromeUser = computed(() => (this.bare() ? null : this.auth.currentUser()));

  readonly navItems = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return [] as NavItem[];
    return NAV.filter((item) =>
      item.minRole === 'USER'
        ? true
        : item.minRole === 'MANAGER'
          ? this.auth.isManager()
          : this.auth.isAdmin(),
    );
  });

  readonly initials = computed(() => {
    const user = this.auth.currentUser();
    const source = user?.name?.trim() || user?.email || '?';
    const parts = source.split(/[\s._@-]+/).filter(Boolean);
    return ((parts[0]?.[0] ?? '?') + (parts[1]?.[0] ?? '')).toUpperCase();
  });

  toggleDrawer(): void {
    this.drawerOpen.update((open) => !open);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  switchRole(value: string): void {
    this.auth.previewSwitchRole(value as Role);
    this.menuOpen.set(false);
    void this.router.navigateByUrl('/items');
  }

  logout(): void {
    this.menuOpen.set(false);
    this.auth.logout();
    void this.router.navigateByUrl('/login');
  }
}
