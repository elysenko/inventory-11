import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LocationsApi } from '../../../core/api/locations-api.service';
import { toProblem } from '../../../core/api/api-error';
import { Location } from '../../../core/models';

@Component({
  selector: 'app-location-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationFormComponent {
  private readonly router = inject(Router);
  private readonly api = inject(LocationsApi);

  readonly id = input<string>('');

  readonly existing = signal<Location | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);

  /**
   * `withComponentInputBinding()` binds the :id route param, but on a route that
   * has no :id (the "new" form) it supplies `undefined` rather than leaving the
   * declared default in place. Normalising here is what keeps `editing()` false
   * on /new — comparing the raw input against '' would make `undefined` look like
   * an edit and send the create to PATCH /:id/undefined.
   */
  readonly locationId = computed(() => (this.id() ?? '').trim());

  readonly editing = computed(() => this.locationId() !== '');

  readonly name = signal('');
  readonly zone = signal('');
  readonly nameError = signal<string | null>(null);
  readonly zoneError = signal<string | null>(null);
  readonly formError = signal<string | null>(null);

  constructor() {
    effect(() => {
      const id = this.locationId();
      void this.load(id);
    });

    effect(() => {
      const location = this.existing();
      if (!location) return;
      this.name.set(location.name);
      this.zone.set(location.zone);
    });
  }

  private async load(id: string): Promise<void> {
    if (!id) {
      this.existing.set(null);
      return;
    }
    this.loading.set(true);
    this.formError.set(null);
    try {
      this.existing.set(await this.api.get(id));
    } catch (err) {
      this.existing.set(null);
      this.formError.set(toProblem(err).message);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * (name, zone) must be unique, but that is not checked here: the full list is
   * not loaded and a local check would race anyway. The server compares the pair
   * case-insensitively and answers a clash with a 422 carrying `field: 'zone'`,
   * which is where the message lands.
   */
  async save(): Promise<void> {
    this.nameError.set(null);
    this.zoneError.set(null);
    this.formError.set(null);

    if (!this.name().trim()) {
      this.nameError.set('A location name is required.');
      return;
    }
    if (!this.zone().trim()) {
      this.zoneError.set('A zone is required.');
      return;
    }

    const payload = { name: this.name().trim(), zone: this.zone().trim() };

    this.saving.set(true);
    try {
      if (this.editing()) {
        await this.api.update(this.locationId(), payload);
      } else {
        await this.api.create(payload);
      }
      void this.router.navigate(['/locations']);
    } catch (err) {
      const problem = toProblem(err);
      if (problem.field === 'zone') {
        this.zoneError.set(problem.message);
      } else if (problem.field === 'name') {
        this.nameError.set(problem.message);
      } else {
        this.formError.set(problem.message);
      }
    } finally {
      this.saving.set(false);
    }
  }
}
