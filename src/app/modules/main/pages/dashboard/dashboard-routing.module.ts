import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/overview/dashboard.component";

const dashboardRoutes: Routes = [
  {
    path: 'overview',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'main/dashboard/overview',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'main/dashboard/overview',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
