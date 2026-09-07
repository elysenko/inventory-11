import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Role } from './models';

/** roleGuard(['MANAGER', 'ADMIN']) — wrong role lands on /403, never on a redirect loop. */
export const roleGuard =
  (allowed: readonly Role[]): CanActivateFn =>
  (_route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated()) {
      if (COLOSSUS_PREVIEW) {
        auth.previewSignIn();
      } else {
        return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
      }
    }

    return auth.hasRole(allowed) ? true : router.createUrlTree(['/403']);
  };
