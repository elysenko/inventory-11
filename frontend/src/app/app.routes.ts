import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { roleGuard } from './core/role.guard';

const MANAGER = ['MANAGER', 'ADMIN'] as const;
const ADMIN = ['ADMIN'] as const;

/**
 * Every screen is deep-linkable at its own URL — including wizard-ish states such as
 * item detail tabs and delete confirmations, which live in query params rather than
 * component memory.
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'items' },
  {
    path: 'login',
    title: 'Sign in · StockRoom',
    data: { flow: 'auth.login' },
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    title: 'Create account · StockRoom',
    data: { flow: 'auth.signup' },
    loadComponent: () => import('./pages/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'items',
    title: 'Items · StockRoom',
    data: { flow: 'items.list' },
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/items/item-list/item-list.component').then((m) => m.ItemListComponent),
  },
  {
    path: 'items/new',
    title: 'New item · StockRoom',
    data: { flow: 'items.create' },
    canActivate: [roleGuard(MANAGER)],
    loadComponent: () =>
      import('./pages/items/item-form/item-form.component').then((m) => m.ItemFormComponent),
  },
  {
    path: 'items/:id',
    title: 'Item · StockRoom',
    data: { flow: 'items.detail' },
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/items/item-detail/item-detail.component').then((m) => m.ItemDetailComponent),
  },
  {
    path: 'items/:id/edit',
    title: 'Edit item · StockRoom',
    data: { flow: 'items.edit' },
    canActivate: [roleGuard(MANAGER)],
    loadComponent: () =>
      import('./pages/items/item-form/item-form.component').then((m) => m.ItemFormComponent),
  },
  {
    path: 'locations',
    title: 'Locations · StockRoom',
    data: { flow: 'locations.list' },
    canActivate: [roleGuard(MANAGER)],
    loadComponent: () =>
      import('./pages/locations/location-list/location-list.component').then(
        (m) => m.LocationListComponent,
      ),
  },
  {
    path: 'locations/new',
    title: 'New location · StockRoom',
    data: { flow: 'locations.create' },
    canActivate: [roleGuard(MANAGER)],
    loadComponent: () =>
      import('./pages/locations/location-form/location-form.component').then(
        (m) => m.LocationFormComponent,
      ),
  },
  {
    path: 'locations/:id/edit',
    title: 'Edit location · StockRoom',
    data: { flow: 'locations.edit' },
    canActivate: [roleGuard(MANAGER)],
    loadComponent: () =>
      import('./pages/locations/location-form/location-form.component').then(
        (m) => m.LocationFormComponent,
      ),
  },
  {
    path: 'movements/new',
    title: 'Record movement · StockRoom',
    data: { flow: 'movements.record' },
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/movements/movement-form/movement-form.component').then(
        (m) => m.MovementFormComponent,
      ),
  },
  {
    path: 'movements',
    title: 'Movement log · StockRoom',
    data: { flow: 'movements.log' },
    canActivate: [roleGuard(MANAGER)],
    loadComponent: () =>
      import('./pages/movements/movement-log/movement-log.component').then(
        (m) => m.MovementLogComponent,
      ),
  },
  {
    path: 'reports/low-stock',
    title: 'Low stock · StockRoom',
    data: { flow: 'reports.lowStock' },
    canActivate: [roleGuard(MANAGER)],
    loadComponent: () =>
      import('./pages/reports/low-stock/low-stock.component').then((m) => m.LowStockComponent),
  },
  {
    path: 'admin/settings',
    title: 'Settings · StockRoom',
    data: { flow: 'admin.settings' },
    canActivate: [roleGuard(ADMIN)],
    loadComponent: () =>
      import('./pages/admin/settings/settings.component').then((m) => m.SettingsComponent),
  },
  {
    path: '403',
    title: 'No access · StockRoom',
    data: { flow: 'error.forbidden' },
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/forbidden/forbidden.component').then((m) => m.ForbiddenComponent),
  },
  { path: '**', redirectTo: 'items' },
];
