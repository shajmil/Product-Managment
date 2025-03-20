import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes').then(r => r.PRODUCT_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
