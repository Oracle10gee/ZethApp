import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CacheService } from 'src/app/core/cache/cache.service';
import { environment as ENV } from 'src/environments/environment';
import { BootstrapNotifyService } from './../../../../../../core/bootstrapNotify/bootstrap-notify.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatStepper, StepperOrientation} from '@angular/material/stepper';

export interface Merchant {
  name: string;
}

function forbiddenNamesValidator(Services: any[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const index = Services.findIndex(Service => {
      return new RegExp("^" + Service.name + "$").test(control.value);
    });
    return index < 0 ? { forbiddenNames: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls:  ['../../../../../../../assets/css/angularMaterial.css', '../../components/configuration/configuration.component.css']
})

export class ConfigurationComponent implements OnInit {
  value: any;
  loadOptions: any;
  numbVal: any;
  merchantName: any;
  merchantID: any = "ID: 1234567890";

  // plain is true while config is false by default
  plainSection: boolean = false;
  configurationSection: boolean = true;
  // @Input() set item(value: number) {
  //   this.loadOptions(value);
  // }
  otherConfigPage: boolean = true;
  submitConfigurationPage: boolean = false;
  state!: string;
  isOptional = false;
  enableNarrationStep = false;
  enablePaymentStep = true;
  enableFurtherStep = false;
  enableReceiptStep = false;
  enableOtherStep = false;
  enableNextStep = false;
  // step: any = 1;
  customFields: any[] = [];
  submitConfig: any[] = [];
  customNumber: any;
  paymentNumber: any;
  stepperOrientation: Observable<StepperOrientation>;
  customFieldData: any;
  narrationData: any;
  paymentData: any;
  furtherProcessingData: any;
  receiptData: any;
  configData: any;

  options: Merchant[] = [
    {name: 'Dangote Group'},
    {name: 'FMN Group'},
    {name: 'Kasumigaseki Capital'},
    {name: 'HoneyWell Flour Mills Plc'},
    {name: 'Crown Flour Mills Ltd'},
    {name: 'Danish Cookies Suppliers Plc'},
    {name: 'Joseph Cookies Suppliers Plc'}
  ];

  configurations = [
    'Custom Fields',
    'Narration',
    'Payment',
    "Further Proccessing",
    'Receipt',
    'Other Configuration'
  ]

  public myControl = new FormControl(null, [
    Validators.required,
    forbiddenNamesValidator(this.options)
  ]);
  filteredOptions!: Observable<Merchant[]>;

  recievedData: any;
  @ViewChild('stepper')  stepper!: MatStepper;

  constructor(private cacheService: CacheService, private router: Router, private bootstrapNotifyService: BootstrapNotifyService, breakpointObserver: BreakpointObserver) {
    const token = this.cacheService.getSession(ENV.TOKEN);
    if(!token || token === '' ) {
      // console.log('token is not here');
      this.router.navigate(['/auth/login']);
    }
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 850px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    // this.getNumber(this.numbVal);
    this.myControl.valueChanges.subscribe(data => {
      // console.log(data);
      this.recievedData = data;
    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith<string | Merchant>(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice()))
    );
  }

  getNumber(newNumber: number) {
    // console.log(newNumber);
    this.customNumber = newNumber;
    if (!this.customNumber) {
      this.enableNarrationStep = false;
    } else if (this.customNumber > 0) {
      this.enableNarrationStep = true;
    }
  }

  getPaymentValue(newValue: number) {
    console.log(newValue);
    this.paymentNumber = newValue;
    if (!this.paymentNumber) {
      this.enableFurtherStep = false;
    } else if (this.paymentNumber > 0) {
      this.enableFurtherStep = true;
    }
  }

  // goToNarration(stepper: MatStepper) {
  //   console.log(stepper);
  //   this.enableNextStep = false;
  //   if (this.customNumber) {
  //     this.enableNextStep = true;
  //       stepper.next();
  //   } else if(!this.customNumber || this.customNumber == null || this.customNumber === 0) {
  //     this.bootstrapNotifyService.error('Kindly create custom fields to move to the next configuration');
  //     this.enableNextStep = false;
  //   }
  // }

  goToNarration(stepper: MatStepper) {
    // console.log(stepper)
    this.state = 'done';
    stepper.next();
  }

  goToPayment(stepper: MatStepper) {
    // console.log(stepper)
    stepper.next();
  }

  goToFurther(stepper: MatStepper) {
    // this.enableFurtherStep = true;
    stepper.next();
  }

  stepperBack() {
    // this.isEditable = true;
  }

  // displayFn(merchant: Merchant): string {
  //   return merchant && merchant.name ? merchant.name : '';
  // }

  public displayFn(merchant: Merchant): string {
    return merchant && merchant.name  ? merchant.name : ''
  }

  private _filter(name: string): Merchant[] {
    if (name === '') {
      return this.options.slice()
    }

    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  searchMerchant() {
    console.log('recievedData', this.recievedData);

    if (this.recievedData) {
      this.plainSection = false;
      this.configurationSection = true;
      this.merchantName = this.recievedData;
      this.bootstrapNotifyService.success(this.merchantName + ' Selected as Merchant');
    } else {
      this.bootstrapNotifyService.error('Kindly Select a Merchant from the list');
    }
  }

  gotoStart() {
    this.plainSection = true;
    this.configurationSection = false;
    this.recievedData = '';
    this.myControl.patchValue("")
  }

  public backToOtherConfig() {
    this.otherConfigPage = true;
    this.submitConfigurationPage = false;
  }

  public finishConfig() {
    this.otherConfigPage = false;
    this.submitConfigurationPage = true;
    this.getSummary();
  }

  getSummary() {
    if(this.submitConfigurationPage === true) {
      this.customFieldData = localStorage.getItem('JsonDetails');
      this.narrationData = localStorage.getItem('NarrationDetails');
      this.paymentData = localStorage.getItem('PaymentDetails');
      this.furtherProcessingData = localStorage.getItem('FurtherProcessingDetails');
      this.receiptData = localStorage.getItem('ReceiptDetails');
      this.configData = localStorage.getItem('ConfigDetails');
    }

  }

  submitConfigurations() {
    // const customFieldData = localStorage.getItem('JsonDetails');
    // const narrationData = localStorage.getItem('NarrationDetails');
    // const paymentData = localStorage.getItem('PaymentDetails');
    // const furtherProcessingData = localStorage.getItem('FurtherProcessingDetails');
    // const receiptData = localStorage.getItem('ReceiptDetails');
    // const configData = localStorage.getItem('ConfigDetails');

    if (this.customFieldData && this.narrationData && this.paymentData && this.furtherProcessingData && this.receiptData && this.configData) {
      const customRecords = JSON.parse(this.customFieldData);
      const narrationRecords = JSON.parse(this.narrationData);
      const paymentRecords = JSON.parse(this.paymentData);
      const furtherProcessingRecords = JSON.parse(this.furtherProcessingData);
      const receiptRecords = JSON.parse(this.receiptData);
      const configRecords = JSON.parse(this.configData);
      // this.storageData = records;
      this.submitConfig = [...customRecords,...narrationRecords,...paymentRecords,...furtherProcessingRecords,...receiptRecords,...configRecords];
      console.log(this.submitConfig);
      localStorage.setItem('SubmitConfigurationDetails',JSON.stringify(this.submitConfig));
      this.bootstrapNotifyService.success("Merchant Configurations Submitted Successfully");
    } else if (this.customFieldData && this.paymentData !== null) {
      const customRecords = JSON.parse(this.customFieldData);
      const paymentRecords = JSON.parse(this.paymentData);
      // this.storageData = records;
      this.submitConfig = [...customRecords,...paymentRecords];
      console.log(this.submitConfig);
      localStorage.setItem('SubmitConfigurationDetails',JSON.stringify(this.submitConfig));
      this.bootstrapNotifyService.success("Merchant Configurations Submitted Successfully");
    } else {
      this.bootstrapNotifyService.error("No saved configurations for Custom Fields and Payment");
    }

  }

}
