import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

/** Endpoints that mint a session. A 401 here is "wrong password", not "expired". */
const CREDENTIAL_ENDPOINTS = ['/api/auth/login', '/api/auth/signup'];

/**
 * Sign-out is already tearing the session down, so a failure must not be
 * escalated into another logout-and-redirect — that would recurse once and
 * double-navigate. It still carries the token, unlike the credential endpoints.
 */
const LOGOUT_ENDPOINT = '/api/auth/logout';

const isCredentialRequest = (url: string): boolean =>
  CREDENTIAL_ENDPOINTS.some((endpoint) => url.startsWith(endpoint));

/**
 * Attaches the bearer token to every API call and turns the two auth failures
 * into navigation.
 *
 * The token is a JWT in localStorage, never a cookie, so it has to be attached
 * explicitly. Credential endpoints are excluded from both halves: they need no
 * token, and their 401 belongs inline under the password field rather than as a
 * redirect back to the page the user is already on.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isApi = req.url.startsWith('/api/');
  const isCredential = isCredentialRequest(req.url);
  const isLogout = req.url.startsWith(LOGOUT_ENDPOINT);
  const token = auth.token();

  const outbound =
    isApi && token && !isCredential
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(outbound).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse) || !isApi || isCredential || isLogout) {
        return throwError(() => error);
      }

      if (error.status === 401) {
        // The token is gone or expired. Clear it before navigating, otherwise the
        // route guard sees a signed-in user and lets the redirect bounce back.
        auth.logout();
        const returnUrl = router.url;
        void router.navigate(['/login'], {
          queryParams: returnUrl.startsWith('/login') ? {} : { returnUrl },
        });
      } else if (error.status === 403) {
        // Authenticated but not permitted. The route guards catch this for
        // navigation; this covers a role that changed since the page loaded.
        void router.navigate(['/403']);
      }

      // Re-thrown either way: the component still owns how it reports the failure.
      return throwError(() => error);
    }),
  );
};
