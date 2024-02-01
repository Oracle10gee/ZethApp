import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfigurationComponent } from "./components/configuration/configuration.component";

const configurationRoutes: Routes = [
  {
    path: 'configuration',
    component: ConfigurationComponent
  },
  {
    path: '',
    redirectTo: 'configuration',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(configurationRoutes)],
  exports: [RouterModule]
})

export class ConfigurationRoutingModule { }
