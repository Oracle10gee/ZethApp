import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    TransactionComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule,
    MatTabsModule,
    MatDialogModule
  ]
})
export class TransactionModule { }
