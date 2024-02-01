import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { TableColumn } from 'src/app/shared/components/table/table-properties/table-columns';
import { Merchant } from 'src/app/shared/models/mock-models';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AnimationDurations } from '@angular/material/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-merchant-table',
  templateUrl: './view-merchant-table.component.html',
  styleUrls: ['./view-merchant-table.component.css'],
  providers: [CurrencyPipe, DecimalPipe, PercentPipe]
})
export class ViewMerchantTableComponent implements OnInit {
 
  merchants!: Merchant[];
  merchantsTableColumns!: TableColumn[];
  showActions = false;

  constructor(private currencyPipe: CurrencyPipe,
              private decimalPipe: DecimalPipe,
              private percentPipe: PercentPipe,
              public dialog: MatDialog,
              public router: Router) {
  }

  ngOnInit(): void {
    this.initializeColumns();
    this.merchants = this. getMerchants();
  }

  // sortData(sortParameters: Sort) {
  //    const keyName = sortParameters.active;
  //   if (sortParameters.direction === 'asc') { 
  //     // this.merchants = this.merchants.sort((a: Merchant, b: Merchant) => a[keyName].localeCompare(b[keyName]));
  //     this.merchants = this.merchants.sort((a: Merchant, b: Merchant)=> a[keyName].localeCompare(b[keyName]));
  //   } else if (sortParameters.direction === 'desc') {
  //     this.merchants = this.merchants.sort((a: Merchant, b: Merchant) => b[keyName].localeCompare(a[keyName]));
  //   } else {
  //     return this.merchants= this.getMerchants();
  //   }
  // }
 
  initializeColumns(): void {
    this.merchantsTableColumns = [
      {
        name: ' ',
        dataKey: 'id',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Merchant Name',
        dataKey: 'merchantName',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Merchant ID',
        dataKey: 'merchantID',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Date Created',
        dataKey: 'dateCreated',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Status',
        dataKey: 'status',
        position: 'left',
        isSortable: false
      },
      {
        name: 'RIM Number',
        dataKey: 'rimNumber',
        position: 'right',
        isSortable: false
      }
    ];
  }

  getMerchants(): any[] {
    return [
      {
        id: 1,
        merchantName: 'Artco',
        merchantID: 12343434,
        dateCreated: '12/03/1994',
        status: 'Active',
        rimNumber: 909877666
      },
      {
        id: 2,
        merchantName: 'Samad Holdings',
        merchantID: 12343434,
        dateCreated: '12/03/1994',
        status: 'Active',
        rimNumber: 909877666
      },
      {
        id: 3,
        merchantName: 'Elysium Partners',
        merchantID: 12343434,
        dateCreated: '12/03/1994',
        status: 'Active',
        rimNumber: 909877666
      },
      {
        id: 4,
        merchantName: 'Coinbank PLC',
        merchantID: 12343434,
        dateCreated: '12/03/1994',
        status: 'Active',
        rimNumber: 909877666
      },
      {
        id: 5,
        merchantName: 'Dangote Cement',
        merchantID: 12343434,
        dateCreated: '12/03/1994',
        status: 'Active',
        rimNumber: 909877666
      },
    ];
  }

  viewActionBtn(){
    this.showActions = !this.showActions;
  }

  deactivateMerchant(){
   let MatDialogRef =   this.dialog.open(ModalComponent, 
        {
          data: {
            modalIcon: "warning",
            modalHeaderTitle: "Deactivate Merchant",
            modalMessage1: "Are you sure you want to deactivate this merchant?",
            modalMessage2: "Please note that you cannot undo this action",
            actionBtnText: "Deactivate",
          }


        })
  }

  ondeactivate(){
    console.log("action button worked")
  }


  onView(){
   this.router.navigate(['/main/merchant/manage-merchant'])
  }
 

  onEdit(){
    
  }
}
