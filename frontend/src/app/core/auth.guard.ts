import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Redirects at most once and never runs on /login, so no guard↔shell redirect loop
 * is reachable. In preview builds a cold load of an authenticated route seeds a
 * session and renders that screen instead of bouncing to the login page.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) return true;

  if (COLOSSUS_PREVIEW) {
    auth.previewSignIn();
    return true;
  }

  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
