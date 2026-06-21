import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: 'atelies',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/atelies/atelie-list/atelie-list.component'
          ).then((m) => m.AtelieListComponent),
      },
      {
        path: 'novo',
        loadComponent: () =>
          import('./features/atelies/atelie-form/atelie-form.component').then(
            (m) => m.AtelieFormComponent,
          ),
      },
      {
        path: 'editar/:id',
        loadComponent: () =>
          import('./features/atelies/atelie-form/atelie-form.component').then(
            (m) => m.AtelieFormComponent,
          ),
      },
    ],
  },
  {
    path: 'projetos',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/projetos/projeto-list/projeto-list.component').then(
            (m) => m.ProjetoListComponent,
          ),
      },
      {
        path: 'novo',
        loadComponent: () =>
          import('./features/projetos/projeto-form/projeto-form.component').then(
            (m) => m.ProjetoFormComponent,
          ),
      },
      {
        path: 'editar/:id',
        loadComponent: () =>
          import('./features/projetos/projeto-form/projeto-form.component').then(
            (m) => m.ProjetoFormComponent,
          ),
      },
    ],
  },
  {
    path: 'admin/users',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/user-list/user-list.component').then(
        (m) => m.UserListComponent,
      ),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
