import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';

// Components
import { CustomFieldComponent } from './components/custom-field/custom-field.component';
import { NarrationComponent } from './components/narration/narration.component';
import { PaymentComponent } from './components/payment/payment.component';
// import { NormalTableComponent } from 'src/app/shared/components/normal-tables/normal-tables.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';

// Angular material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { OtherConfigurationComponent } from './components/other-configuration/other-configuration.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { FurtherProcessingComponent } from './components/further-processing/further-processing.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    ConfigurationComponent,
    CustomFieldComponent,
    NarrationComponent,
    PaymentComponent,
    OtherConfigurationComponent,
    ReceiptComponent,
    FurtherProcessingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigurationRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule
  ]
})
export class ConfigurationModule { }
