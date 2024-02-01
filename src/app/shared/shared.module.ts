import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/cards/cards.component';
import { NormalTableComponent } from './components/normal-tables/normal-tables.component';
import { TableComponent } from './components/table/table.component';
import { CardContainerOneComponent } from './components/card-container-one/card-container-one.component';
import { CardContainerTwoComponent } from './components/card-container-two/card-container-two.component';
import { ButtonsComponent } from './components/buttons/buttons.component';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DataPropertyGetterPipePipe } from './pipes/data-property-getter-pipe.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ModalComponent } from './components/modal/modal.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    CardComponent,
    NormalTableComponent,
    ButtonsComponent,
    TableComponent,
    DataPropertyGetterPipePipe,
    ModalComponent,
    CardContainerOneComponent,
    CardContainerTwoComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule

  ],
  exports: [
    CardComponent,
    NormalTableComponent,
    TableComponent,
    CardContainerOneComponent,
    CardContainerTwoComponent,
    ButtonsComponent
  ]
})
export class SharedModule { }
