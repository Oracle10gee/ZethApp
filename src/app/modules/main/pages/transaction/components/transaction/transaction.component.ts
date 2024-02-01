import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from 'src/app/shared/models/tableColumns';
import { transactions } from './transactionModel';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['../../../../../../../assets/css/angularMaterial.css','./transaction.component.css'],
  providers: [MatDialog]
})
export class TransactionComponent implements OnInit {

  transactions!: transactions[];
  transactionsTableColumns!: TableColumn[];

  constructor(private dialog: MatDialog) { }
  @ViewChild('invoiceModal') invoiceModal!:TemplateRef<any>;

  ngOnInit(): void {
  this.initializeColumns();
  this.transactions =  this.getTransactionData();
  }


  initializeColumns(): void{
    this.transactionsTableColumns=[
        {
            name: ' ',
            dataKey: 'id',
            position: 'left',
            isSortable: false
        }, 
        {
          name: 'Merchant Name ',
          dataKey: 'merchantName',
          position: 'left',
          isSortable: false
      }, 
      {
        name: 'Merchant ID',
        dataKey: 'merchantId',
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
    name: 'Status ',
    dataKey: 'status',
    position: 'left',
    isSortable: false
  }, 
  {
    name: 'Process Status ',
    dataKey: 'processStatus',
    position: 'left',
    isSortable: true
  }, 
    ]
  }

  getTransactionData(): any[] {
    return[
      {id: 1, merchantName:'Danish Cookies Suppliers', merchantId: '134256534765', transactionDate:'01/04/2013' ,status:'active', processStatus: 'Failed'},
      {id: 2, merchantName:'Samad Holdings', merchantId: '78909887987', transactionDate:'01/05/2013' ,status:'inactive', processStatus: 'Successful'},
      {id: 3, merchantName:'Elysium Partners', merchantId: '56487658768', transactionDate:'01/02/2013' ,status:'active', processStatus: 'Successful'},
      {id: 4, merchantName:'Coinbank PLC', merchantId: '254365476787', transactionDate:'01/05/2013' ,status:'inactive', processStatus: 'Failed'},
      {id: 5, merchantName:'Dangote Cement', merchantId: '7685968769', transactionDate:'01/07/2013' ,status:'inactive', processStatus: 'Successful'},
      {id: 6, merchantName:'Danish Cookies Suppliers', merchantId: '134256534765', transactionDate:'01/04/2013' ,status:'active', processStatus: 'Failed'},
      {id: 7, merchantName:'Samad Holdings', merchantId: '78909887987', transactionDate:'01/05/2013' ,status:'inactive', processStatus: 'Successful'},
      {id: 8, merchantName:'Elysium Partners', merchantId: '56487658768', transactionDate:'01/02/2013' ,status:'active', processStatus: 'Successful'},
      {id: 9, merchantName:'Coinbank PLC', merchantId: '254365476787', transactionDate:'01/05/2013' ,status:'inactive', processStatus: 'Failed'},
      {id: 10, merchantName:'Dangote Cement', merchantId: '7685968769', transactionDate:'01/07/2013' ,status:'inactive', processStatus: 'Successful'},
    
    ]
  }

  openModal(){
    this.dialog.open(this.invoiceModal),{
      width: '400px',
      height: '500px',

    }
  }

  onView(){
    this.openModal();
  }

 
  
}