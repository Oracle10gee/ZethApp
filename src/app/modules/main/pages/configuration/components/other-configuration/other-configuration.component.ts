import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioChange } from '@angular/material/radio';
import { BootstrapNotifyService } from 'src/app/core/bootstrapNotify/bootstrap-notify.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-other-configuration',
  templateUrl: './other-configuration.component.html',
  styleUrls: ['../../../../../../../assets/css/angularMaterial.css', './other-configuration.component.css']
})
export class OtherConfigurationComponent implements OnInit {
  loading = false;
  configSelected: any;
  radioAction: any;
  closeResult: any;
  modalReference: any;
  number: any;
  getRev: any;
  configData: any[] = [];
  fillConfig: any[] = [];
  otherConfig: any = {
    reversal: {
      allowReversal: false,
    },
    notification: {
      title: null,
      message: null
    }
  }

  configs: any[] = [
    {value: 'config-0', viewValue: 'Reversal'},
    {value: 'config-1', viewValue: 'Notifications'}
    // {value: 'config-2', viewValue: 'Others'},
  ];

  radioOptions: any[] = [
    { name: 'allowReversal', value: false, displayName: "Allow Reversal" },
    // { name: 'notAllowReversal', value: false, displayName: "Don't Allow Reversal"}
  ];
  public reqChecked$ = new BehaviorSubject(false);

  constructor(private bootstrapNotifyService: BootstrapNotifyService, private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log('Show other content');

    const localData = localStorage.getItem('ConfigDetails');
    // this.localData = localData;
    if (localData !== null) {
      let records = JSON.parse(localData);
      this.fillConfig = records.filter((m: any) => m);
      console.log('configData Detail', this.fillConfig);
      // console.log('configData Detail rev', records[0].reversal.allowReversal);
      if (records[0].reversal.allowReversal === true) {
        this.otherConfig.reversal.allowReversal = true;
        // radioBtn.value = true;
      }
      this.otherConfig.notification.title = records[0].notification.title;
      this.otherConfig.notification.message = records[0].notification.message;
      this.number = Object.values(this.configData).length;
      if (this.number == null || undefined || '') {
        this.number = 0;
      }
    } else if (!localData) {
      // this.fieldMessage = ' No fields created yet '
      this.number = 0;
    }
  }

  // getDismissReason(reason: any): string {
	// 	if (reason === ModalDismissReasons.ESC) {
	// 		return 'by pressing ESC';
	// 	} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
	// 		return 'by clicking on a backdrop';
	// 	} else {
	// 		return `with: ${reason}`;
	// 	}
	// }


  openConfig(dependentContent: any) {
		this.modalReference = this.modalService.open(dependentContent, { size: 'lg', windowClass: 'my-class' });
    // this.getDF();
	}



  getOtherConfig(configType: any) {
    let newValType: any;
    newValType = configType.value;
    console.log('Selected Config Val', newValType);
    this.configSelected = newValType;
  }

  toggleRequired(reqVal: any) {
    this.reqChecked$.next(!this.reqChecked$.value);
    // console.log(this.reqChecked$.value);
    console.log(reqVal.checked);
    this.getRev = reqVal.checked;
  }

  getRadio(radioBtn: MatRadioChange, e: any){
    radioBtn.value = true;
    console.log(radioBtn);
    console.log(e);
    this.radioAction = radioBtn;
    this.otherConfig.reversal.allowReversal = this.radioAction.value;
    console.log('Allow Reversal name', this.otherConfig.reversal.allowReversal);
    // console.log(e);
    // console.log(e.value);
  }

  submitReversalContent() {
    // this.loading = false;
    // if (!this.otherConfig.reversal.allowReversal) {
    //   this.bootstrapNotifyService.warning('Select one of the options to proceed');
    //   this.loading = false;
    // } else {
      this.loading = true;
      this.otherConfig.reversal.allowReversal = this.getRev;
      // this.otherConfig.reversal.allowReversal = this.radioAction.value;
      console.log(this.otherConfig.reversal.allowReversal);
      this.bootstrapNotifyService.success("Reversal Content Submitted")

      this.loading = false;

  }

  submitNotificationContent() {
    this.loading = false;
    if (!this.otherConfig.notification.title) {
      this.bootstrapNotifyService.warning('Title Cannot be empty')
    } else if (!this.otherConfig.notification.message) {
      this.bootstrapNotifyService.warning('Message Cannot be empty')
    } else {
      this.loading = true;
      console.log(this.otherConfig.notification.title);
      console.log(this.otherConfig.notification.message);
      this.bootstrapNotifyService.success("Notification Content Submitted");
      this.configData.push(Object.assign({}, this.otherConfig));
      localStorage.setItem('ConfigDetails', JSON.stringify(this.configData));
      this.loading = false;
    }
  }
}
