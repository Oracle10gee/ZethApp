import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantRoutingModule } from './merchant-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { CreateMerchantComponent } from "./components/create-merchant/create-merchant.component";
import { ManageMerchantComponent } from "./components/manage-merchant/manage-merchant.component";
import { ViewMerchantTableComponent } from './components/view-merchant-table/view-merchant-table.component';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
// import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [
        CreateMerchantComponent,
        ManageMerchantComponent,
        ViewMerchantTableComponent,
    ],
    providers: [],
    imports: [
        CommonModule,
        MerchantRoutingModule,
        SharedModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule,
        MatTabsModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        MatExpansionModule,

    ],

    exports: [
    CommonModule,
    MerchantRoutingModule
  ]
})

export class MerchantModule { }
