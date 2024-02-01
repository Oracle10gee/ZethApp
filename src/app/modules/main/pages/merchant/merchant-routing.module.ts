import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateMerchantComponent } from "./components/create-merchant/create-merchant.component";
import { ManageMerchantComponent } from "./components/manage-merchant/manage-merchant.component";
import { ViewMerchantTableComponent } from "./components/view-merchant-table/view-merchant-table.component";

const merchantRoutes: Routes = [
  {
    path: 'create-merchant',
    component: CreateMerchantComponent
  },
  {
    path: 'manage-merchant',
    component: ManageMerchantComponent
  },
  {
    path: 'merchant-list',
    component: ViewMerchantTableComponent
  },
  {
    path: '',
    redirectTo: 'create-merchant',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(merchantRoutes)],
  exports: [RouterModule]
})

export class MerchantRoutingModule { }
