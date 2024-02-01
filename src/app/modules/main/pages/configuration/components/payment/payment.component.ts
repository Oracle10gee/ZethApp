import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { multiplePayment, splitPayment } from './paymentModel';
import { TableColumn } from 'src/app/shared/models/tableColumns';
import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { BootstrapNotifyService } from 'src/app/core/bootstrapNotify/bootstrap-notify.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['../../../../../../../assets/css/angularMaterial.css', './payment.component.css' ],
  providers: [CurrencyPipe, DecimalPipe, PercentPipe]
})
export class PaymentComponent implements OnInit {
  // @Input() merchantName?: any;
  // merchantID: any = "ID: 1234567890";
  number: any;
  loading = false
  singlePaymentValue: any;
  paymentData:any[] = [];

  paymentArray = {
    accountNumber: ''
  }

  @Output() onPaymentChange: EventEmitter<number> = new EventEmitter();

  displayedColumns: string[]= ['s/n', 'feeName', 'amount', 'accountNumber', 'action']
  selectedRow: any;
  dataSource = new MatTableDataSource<multiplePayment>();

  splitPayment!: splitPayment[];
  spiltTableColumns!: TableColumn[];


  paymentSelected: any;

  singlePaymentForm = new FormGroup({
    accountNumber: new FormControl("", [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.required]),
    });

    singleFormValidation(){
      return this.singlePaymentForm.controls;
    }

    paymentSplittingForm = new FormGroup({
      feeName: new FormControl("", [Validators.required] ),
      splitBy: new FormControl("", [Validators.required]),
      value: new FormControl("", [Validators.pattern("^[0-9]*$"), Validators.required]),
      accountNumber: new FormControl("", [Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$"), Validators.required])
    })

    initializeColumns(): void {
      this.spiltTableColumns = [
        {
          name: ' ',
          dataKey: 'id',
          position: 'left',
          isSortable: true
        },
        {
          name: 'Fee Name',
          dataKey: 'feeName',
          position: 'left',
          isSortable: false
        },
        {
          name: 'Value',
          dataKey: 'value',
          position: 'left',
          isSortable: false
        },
        {
          name: 'Account Number',
          dataKey: 'accountNo',
          position: 'right',
          isSortable: false
        }
      ];
    }

  payments: any[] = [
    {value: 'payment-0', viewValue: 'Single Payment'},
    {value: 'payment-1', viewValue: 'Multiple Payment',},
    {value: 'payment-2', viewValue: 'Payment Splitting'},
  ];

  Data: multiplePayment[]=[
    { id: 1, feeName:"item 1", amount:"25,000", accountNo: " "},
    { id: 2, feeName:"item 2", amount: "100,000",accountNo: ""},
    { id: 3, feeName:"item 3", amount: "50,000", accountNo: ""},
    { id: 4, feeName:"item 4", amount: "40,000", accountNo: ""},
    { id: 4, feeName:"item 5", amount: "60,000", accountNo: ""}
  ];

  payment: splitPayment[]=[
    { id: 1, feeName:"item 1", value:"25,000", accountNo: " "},
    { id: 2, feeName:"item 2", value: "100,000",accountNo: ""},
    { id: 3, feeName:"item 3", value: "50,000", accountNo: ""},
    { id: 4, feeName:"item 4", value: "40,000", accountNo: ""},
    { id: 4, feeName:"item 5", value: "60,000", accountNo: ""}
  ]

@ViewChild('setUpPaymentSplitting') setUpPaymentSplitting!:TemplateRef<any>;

  constructor(public dialog: MatDialog, private bootstrapNotifyService: BootstrapNotifyService) { }


  ngOnInit(): void {
    const localData = localStorage.getItem('PaymentDetails');
    // this.localData = localData;
    if (localData !== null) {
      const records = JSON.parse(localData);
      // this.storageData = records;
      // console.log('Json Detail', this.storageData);
      this.number = Object.values(records).length;
      if (this.number == null || undefined || '') {
        this.number = 0;
      }
    } else if (!localData) {
      // this.fieldMessage = ' No fields created yet';
      this.number = 0;
    }


    this.initializeColumns();
    this.getMultiplePayments();
    this.splitPayment = this.getSpiltPayments();


    this.onPaymentChange.emit(this.number);
  }

  paymentType(val: any) {
    // console.log(val);
    console.log(val.source.value);
  }

  public getPaymentVal(paymentType: any) {
    let newValType: any;
    newValType = paymentType.value;
    console.log('Selected Payment Val', newValType);
    this.paymentSelected = newValType;
  }

  getMultiplePayments(){
    this.dataSource = new MatTableDataSource<multiplePayment>(this.Data)
  }

  // getSpiltPayments(){
  //   this.splitPaymentDatasource = new MatTableDataSource<splitPayment>(this.payment)
  // }


  getSpiltPayments(): any[] {
    return [
      { id: 1, feeName:"item 1", value:"25,000", accountNo: "12324345345"},
      { id: 2, feeName:"item 2", value: "100,000",accountNo: "1232434354"},
      { id: 3, feeName:"item 3", value: "50,000", accountNo: "7674534511"},
      { id: 4, feeName:"item 4", value: "40,000", accountNo: "97867564532"},
      { id: 4, feeName:"item 5", value: "60,000", accountNo: "08767756453"}
    ];
  }

  openSetUpModal(){
    this.dialog.open(this.setUpPaymentSplitting, {
      hasBackdrop: true,
      height: '650px',
      width: '400px',
      disableClose: true,
    })
  }

  closeModal(){
    this.dialog.closeAll();
    this.paymentSplittingForm.reset();
  }

  editPayment(){
    this.openSetUpModal();
  }

  saveSinglePayment() {
    this.loading = false;
    this.singlePaymentValue = this.singlePaymentForm.get('accountNumber')?.value;
    // this.singlePaymentValue = this.paymentArray.accountNumber;
    console.log(this.singlePaymentValue);
    if (this.singlePaymentValue === '') {
      this.bootstrapNotifyService.warning('Account Number cannot be empty');
      this.loading = false;
    } else if (this.singlePaymentValue.length <= 9 || this.singlePaymentValue.length > 10) {
      this.bootstrapNotifyService.warning('Account Number needs to be 10 digits');
    } else {
      this.loading = true;
      this.bootstrapNotifyService.success("Account Number Saved")
      this.loading = false;
    }
  }

  submitPayment() {
    this.loading = false;
    if (!this.singlePaymentValue) {
      this.bootstrapNotifyService.warning('Ensure that a PAYMENT OPTION is selected, DETAILS are provided and SAVED');
      this.loading = false;
    } else {
      console.log(this.singlePaymentForm.value);
      this.loading = true;
      this.bootstrapNotifyService.success("Payment Details Captured");
      this.paymentData.push(Object.assign({}, this.singlePaymentForm.value));
      // this.paymentData.push(Object.assign({}, this.paymentArray));
      // let parsePayment = JSON.parse(this.paymentArray)
      // localStorage.setItem('PaymentDetails', JSON.stringify(this.paymentArray));
      localStorage.setItem('PaymentDetails', JSON.stringify(this.paymentData));
      this.number = Object.values(this.paymentData).length;
      this.onPaymentChange.emit(this.number);
      this.loading = false;
    }
  }
}
