import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TransactionComponent } from "./components/transaction/transaction.component";

const transactionRoutes: Routes = [
  {
    path: 'transaction',
    component: TransactionComponent
  },
  {
    path: '',
    redirectTo: 'transaction',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(transactionRoutes)],
  exports: [RouterModule]
})

export class TransactionRoutingModule { }
