import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './auth.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /** Preview-only affordance; folded out of production bundles by esbuild. */
  readonly previewShortcut = COLOSSUS_PREVIEW ? 'Skip login — Demo Mode' : null;

  readonly email = signal('');
  readonly password = signal('');
  readonly error = signal<string | null>(null);
  readonly busy = signal(false);

  async submit(): Promise<void> {
    this.error.set(null);
    this.busy.set(true);
    try {
      await this.auth.login(this.email(), this.password());
      this.goToApp();
    } catch (err) {
      this.error.set(
        err instanceof Error ? err.message : 'We could not sign you in. Check your details and try again.',
      );
    } finally {
      this.busy.set(false);
    }
  }

  skipLogin(): void {
    this.auth.previewSignIn();
    this.goToApp();
  }

  private goToApp(): void {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    void this.router.navigateByUrl(returnUrl && returnUrl.startsWith('/') ? returnUrl : '/items');
  }
}
