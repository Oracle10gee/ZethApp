import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationsComponent } from 'src/app/shared/components/notification-modal/notifications.component';

@Component({
  selector: 'app-create-merchant',
  templateUrl: './create-merchant.component.html',
  styleUrls:  ['../../../../../../../assets/css/angularMaterial.css', './create-merchant.component.css'],
  providers:[MatDialog]
})
export class CreateMerchantComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) { }
  public loading: boolean = false;
  @ViewChild('modal') modal!:TemplateRef<any>;


  newMerchantForm = new FormGroup({
    merchantName :new FormControl('', [Validators.required]),
    rimNumber: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  createMerchant(){
    this.loading = true;
    this.openModal();
    // this.dialog.open(NotificationsComponent ,
    //   {
    //     data: {
    //     modalHeaderTitle: "Merchant Created",
    //     modalMessage:"Merchant created successfully. Merchant ID is 00123456634",
    //     },
    //   });
      // this.viewMerchantList();
  }

  viewMerchantList(){
    this.router.navigate(['/main/merchant/merchant-list'])
  }

  validation() {
    if (this.newMerchantForm.hasError('required')) {
      return 'You must enter a value';
    }

    return this.newMerchantForm.hasError('email') ? 'Not a valid email' : '';
  }

  openModal(){
    this.dialog.open(this.modal),{
      hasBackdrop: true,
      width: '306px',
      disableClose: true,
    }
}

closeModal(){
  this.dialog.closeAll();
  this.viewMerchantList();
}
}
