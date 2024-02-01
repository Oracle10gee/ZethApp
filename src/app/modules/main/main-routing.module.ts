import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/layout/admin/admin.component';

const mainRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import ('src/app/modules/main/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'merchant',
        loadChildren: () => import ('src/app/modules/main/pages/merchant/merchant.module').then(m => m.MerchantModule)
      },
      {
        path: 'configuration',
        loadChildren: () => import ('src/app/modules/main/pages/configuration/configuration.module').then(m => m.ConfigurationModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import ('src/app/modules/main/pages/transaction/transaction.module').then(m => m.TransactionModule)
      },
      {
        path: '',
        redirectTo: 'main/dashboard/overview',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }
