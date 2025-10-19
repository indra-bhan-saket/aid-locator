import { Routes } from '@angular/router';
import { PublicDashboardComponent } from './public-dashboard/public-dashboard';
import { AdminConsoleComponent } from './admin-console/admin-console';
import { ProviderConsoleComponent } from './provider-console/provider-console';
import { AdminGuard } from './guards/admin.guard';
import { ProviderGuard } from './guards/provider.guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicDashboardComponent
  },
  {
    path: 'admin',
    component: AdminConsoleComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'provider',
    component: ProviderConsoleComponent,
    canActivate: [ProviderGuard]
  }
];
