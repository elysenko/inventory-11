import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: '../login/auth.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly previewShortcut = COLOSSUS_PREVIEW ? 'Skip login — Demo Mode' : null;

  readonly name = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly confirm = signal('');
  readonly error = signal<string | null>(null);
  readonly busy = signal(false);

  async submit(): Promise<void> {
    this.error.set(null);
    if (!this.name().trim()) {
      this.error.set('Tell us your name so movements can be attributed to you.');
      return;
    }
    if (this.password() !== this.confirm()) {
      this.error.set('Those two passwords do not match.');
      return;
    }
    this.busy.set(true);
    try {
      await this.auth.signup(this.name(), this.email(), this.password());
      this.goToApp();
    } catch (err) {
      this.error.set(
        err instanceof Error ? err.message : 'We could not create that account. Try again.',
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
