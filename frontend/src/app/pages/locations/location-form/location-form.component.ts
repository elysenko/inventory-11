import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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

  readonly id = input<string>('');

  readonly locations = signal<Location[]>([
    { id: 'loc-a', name: 'Main', zone: 'Zone A', itemCount: 6, totalQty: 412 },
    { id: 'loc-b', name: 'Main', zone: 'Zone B', itemCount: 5, totalQty: 268 },
    { id: 'loc-c', name: 'Overflow', zone: 'Zone C', itemCount: 4, totalQty: 131 },
  ]);

  readonly editing = computed(() => this.id() !== '');
  readonly existing = computed(() => this.locations().find((row) => row.id === this.id()) ?? null);

  readonly name = signal('');
  readonly zone = signal('');
  readonly nameError = signal<string | null>(null);
  readonly zoneError = signal<string | null>(null);

  constructor() {
    effect(() => {
      const location = this.existing();
      if (!location) return;
      this.name.set(location.name);
      this.zone.set(location.zone);
    });
  }

  save(): void {
    this.nameError.set(null);
    this.zoneError.set(null);

    if (!this.name().trim()) {
      this.nameError.set('A location name is required.');
      return;
    }
    if (!this.zone().trim()) {
      this.zoneError.set('A zone is required.');
      return;
    }

    // (name, zone) is unique — the API answers a duplicate with 422 on the zone field.
    const clash = this.locations().find(
      (row) =>
        row.id !== this.id() &&
        row.name.toLowerCase() === this.name().trim().toLowerCase() &&
        row.zone.toLowerCase() === this.zone().trim().toLowerCase(),
    );
    if (clash) {
      this.zoneError.set(`${clash.name} · ${clash.zone} already exists. Pick a different zone.`);
      return;
    }

    void this.router.navigate(['/locations']);
  }
}
