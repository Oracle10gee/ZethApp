import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { TableColumn } from 'src/app/shared/models/tableColumns';
import { transactions } from './merchantMock';

@Component({
  selector: 'app-manage-merchant',
  templateUrl: './manage-merchant.component.html',
  styleUrls:  ['../../../../../../../assets/css/angularMaterial.css', './manage-merchant.component.css'],
})
export class ManageMerchantComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  mode: ProgressBarMode = 'determinate';
  value = 50;
  transactionData!: transactions[];
  transactionTableColumns!: TableColumn[]; 
  constructor() { }

  ngOnInit(): void {
    this.initializeColumns();
    this.transactionData = this.getTransactionDetails();
  }

  initializeColumns(): void {
    this.transactionTableColumns = [
      {
        name: ' ',
        dataKey: 'id',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Transaction ID ',
        dataKey: 'transactionId',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Transaction Date',
        dataKey: 'transactionDate',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Status',
        dataKey: 'status',
        position: 'right',
        isSortable: false
      }
    ];
  }

  getTransactionDetails(): any[] {
    return [
      { id: 1, transactionId:"001232342342", transactionDate:"01/02/2034", status: "Inactive"},
      { id: 2, transactionId:"001232342342", transactionDate: "01/02/2034",status:"Inactive"},
      { id: 3, transactionId:"001232342342", transactionDate: "01/02/2034", status: "Inactive"},
      { id: 4, transactionId:"001232342342", transactionDate: "01/02/2034", status:"Inactive"},
      { id: 4,transactionId:"001232342342", transactionDate:"01/02/2034", status: "Inactive"}
    ];
  }

  merchantDetails: any[] =[
   {icon: 'person ', label:'Merchant Name', value:'Dangote Cement'},
   {icon: 'local_atm', label:'Merchant ID', value:'123456789'},
   {icon: 'mood', label:'RIM Number', value:'2223453434543'},
   {icon: 'notifications', label:'Phone NUmber', value:'09077675345'},
   {icon: 'email', label:'Email Address', value:'dangotegroup@info.com'},
  ]

  configurationDetails: any[] =[
   {id:'1', fieldName: 'customField', displayName: 'Custom Field', values:[{name: 'Text fields', displayValue:'Text'}], counter:'5'},
   {id:'2', fieldName:'paymentConfiguration', displayName: 'Payment Configuration'},
   {id:'3', fieldName:'narration', displayName: 'Narration'},
   {id:'4', fieldName:'otherConfigurations', displayName: 'Other Configurations'}
  ]

  configDropdowns: any[] =[
    {id: '1', }
  ]
}
