// Template and Design Created by Iruobe Akhigbe Ayomide
// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { RouterModule } from '@angular/router';
// Components
import { AdminComponent } from './pages/layout/admin/admin.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SideBarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
// Material


@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    SideBarComponent,
 
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatTableModule,
    MatCardModule,
    SharedModule,
    RouterModule
  ]
})
export class MainModule { }
