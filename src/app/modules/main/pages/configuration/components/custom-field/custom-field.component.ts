import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from 'src/app/core/store/store.service';
import { BehaviorSubject } from "rxjs";
import {FormGroup, FormControl, FormBuilder, NgForm, Validators} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { BootstrapNotifyService } from 'src/app/core/bootstrapNotify/bootstrap-notify.service';

@Component({
  selector: 'app-custom-field',
  templateUrl: './custom-field.component.html',
  styleUrls: ['../../../../../../../assets/css/angularMaterial.css'],
  providers: [NgbModal]
})
export class CustomFieldComponent implements OnInit {
  @Input() merchantName?: any;
  // ItemType: any;
  @Output() onDataChange: EventEmitter<number> = new EventEmitter();
  number: any;
  fieldName: any;
  value: boolean = false;
  create: any = true;
  update: any = false;
  startDate = new Date(2023, 0, 1);
  loading: boolean = false;
  merchantID: any = "ID: 1234567890";
  fieldTypeVal: any;
  dropDownVal: any;
  fieldType: any = this.storeService.fieldTypes;
  validationTypeVal: any;
  modalReference: any;
  closeResult: any;
  checklist = false;
  disabledDataType =  false;
  disabledTriggerValue =  false;
  disabledDependentFieldsValue =  false;
  disabledDataSourceValue: boolean = false;
  disabledValidation: boolean = false;
  disabledFieldValue: boolean = false;

  emailValue: any;
  row: any;
  localData: any;
  disabledMinlength: boolean = true;
  hiddenMinlength: boolean = true;
  disabledMaxlength: boolean = true;
  hiddenMaxlength: boolean = true;
  disabledRegex: boolean = true;
  hiddenRegex: boolean = true;
  showMin: boolean = false;
  showMax: boolean = false;
  showReg: boolean = false;
  checked: any[] = [];
  dependentFields: any[] = [];
  dependentFieldsSelect: any[] = [];
  customeFieldsArr: any[] = [];
  storageData: any[] = [];
  jsonArray: any = {
    fieldName: '',
    label: '',
    fieldType: '',
    validation: '',
    validationDetails: {
      validationUrl: '',
      validationRequest: '',
      validationResponse: ''
    },
    custom: {
      email: false,
      max: {
        maxlength: '',
        minlength: ''
      },
      others: ''
    },
    
    required: false,
    readonly: false,
    password: false,
    hidden: false,
    amount: false,
    trigger: '',
    triggerDetails: {
      triggerUrl: '',
      triggerRequest: '',
      triggerResponse: ''
    },
    dependentFields: '',
    dependentFieldsDetails: [{
      name: '',
      action: ''
    }
  ],
  dataSource: '',
  dataSourceDetails: {
    dataSourceUrl: '',
    dataSourceRequest: '',
    dataSourceResponse: '',
  },
  dataType: '',
    tag: '',
    value: ''
  }
  dependentFieldsDetails: {name: string, action: string}[] = [];
  result: any = {};

  public reqChecked$ = new BehaviorSubject(false);
  public redChecked$ = new BehaviorSubject(false);
  public pasChecked$ = new BehaviorSubject(false);
  public hidChecked$ = new BehaviorSubject(false);
  public amountChecked$ = new BehaviorSubject(false);
  public defChecked$ = new BehaviorSubject(false);


  triggerTypeVal = '';

  displayValUrl = '';
  displayCustomVal = '';
  displayValRequest = '';
  displayValResponse = '';

  displayTriggerUrl = '';
  displayTriggerRequest = '';
  displayTriggerResponse = '';

  displayDataUrl = '';
  displayDataRequest = '';
  displayDataResponse = '';

  tellerForm!: FormGroup;
  selectedValue: any;

  // customFields : any[] = [
  //   {name: 'invoiceNumber', displayName: 'Invoice Number', id: 1},
  //   {name: 'name', displayName: 'Name', id: 2},
  //   {name: 'phoneNumber', displayName: 'Phone Number', id: 3},
  //   {name: 'quantity', displayName: 'Quantity', id: 4},
  //   {name: 'state', displayName: 'State', id: 5},
  //   {name: 'amount', displayName: 'Amount', id: 6},
  //   {name: 'adminPhoneNumber', displayName: 'Admin Phone Number', id: 7},
  //   {name: 'email', displayName: 'Email', id: 8},
  //   {name: 'lga', displayName: 'L.G.A', id: 9},
  //   {name: 'factoryLocation', displayName: 'Factory Location', id: 10},
  //   {name: 'secretCode', displayName: 'Secret Code', id: 11},
  //   {name: 'date', displayName: 'Date', id: 12},

  // ]

  radioOptions: any[] = [
    { name: 'disable', value: false, displayName: 'Disable' },
    { name: 'hidden', value: false, displayName: 'Hidden'},
    { name: 'cascadingSelect', value: false, displayName: 'Cascading Select' },
    { name: 'none', value: false, displayName: 'None'},
  ];
  radioAction: any;
  isValidUrl: any;
  checkName: any;
  actionName: any;


  valueOfDependentFieldsDetails: any = [{
    name: '',
    action:''
  }];

  arrayOfValues: any = [];
  fieldMessage: any;
  gender: any;

  constructor(private storeService: StoreService, private fb: FormBuilder, private modalService: NgbModal, private bootstrapNotifyService: BootstrapNotifyService) { }

  ngOnInit(): void {
    const localData = localStorage.getItem('JsonDetails');
    this.localData = localData;
    if (localData !== null) {
      const records = JSON.parse(localData);
      this.storageData = records;
      // console.log('Json Detail', this.storageData);
      this.number = Object.values(this.storageData).length;
      if (this.number == null || undefined || '') {
        this.number = 0;
      }
    } else if (!localData) {
      this.fieldMessage = ' No fields created yet '
      this.number = 0;
    }

    this.tellerForm = this.fb.group({
    });
    this.createFormControl();

    // this.jsonArray.Value.fieldName = {};

    this.isValidUrl = (urlString: any)=> {
	  	var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(urlString);
    }

    this.onDataChange.emit(this.number);
  }

  //dev-k
  onCheckboxChange(field: any) {
    if (field.value) {
      this.dependentFieldsDetails.push({ name: field.fieldName, action: '' });
    } else {
      const index = this.dependentFieldsDetails.findIndex(item => item.name === field.fieldName);
      this.dependentFieldsDetails.splice(index, 1);
    }
    // console.log("test", this.dependentFields)
    console.log(field.fieldName)
  }
  onRadioChange(option: any, fieldName: any) {
    const index = this.dependentFieldsDetails.findIndex(item => item.name === fieldName);
  if (index !== -1) {
    this.dependentFieldsDetails[index].action = option.name;
  } else {
    this.dependentFieldsDetails.push({ name: fieldName, action: option.name });
  }
  localStorage.setItem('dependentFieldDetailsJson', JSON.stringify(this.dependentFieldsDetails))
  console.log("DependentFieldDetails",this.dependentFieldsDetails);
}



  checkboxValue(checkbox: MatCheckboxChange, e: any){
    if (e.checked === true) {
      this.result[`$checkbox.fieldName}`] = checkbox;
      this.checkName = checkbox;
      console.log(this.result[`$checkbox.fieldName}`]);
      this.jsonArray.dependentFieldsDetails.name = this.checkName.fieldName;
      console.log(this.jsonArray.dependentFieldsDetails.name);
    }
  }

  // checkboxValue(checkbox: MatCheckboxChange, e: any){
  //   this.result[`$checkbox.name}`] = checkbox;
  //   this.checkName = checkbox;
  //   this.jsonArray.dependentFieldsDetails.name = this.checkName.name;
  // }

  getRadio(radioBtn: MatRadioChange, e: any, name: string){
    this.result[`${name}`] = radioBtn;
    this.actionName = radioBtn;
    this.jsonArray.dependentFieldsDetails.action = this.actionName.name;
    this.valueOfDependentFieldsDetails = {};
    this.valueOfDependentFieldsDetails.name = this.jsonArray.dependentFieldsDetails.name;
    this.valueOfDependentFieldsDetails.action = this.jsonArray.dependentFieldsDetails.action;
    console.log('ee',e);
    console.log('name',name);

    this.arrayOfValues.push(this.valueOfDependentFieldsDetails);
    this.jsonArray.dependentFieldsDetails = this.arrayOfValues;
    console.log(this.jsonArray.dependentFieldsDetails, 'fields');
   }


  createFormControl() {
    this.storageData?.forEach((element: any): void => {

      if (element.dataSource === "gender") {
        console.log(element.fieldType);
        // element.value = "Male, Female"
        // element.fieldType = "hidden";
        console.log(this.storeService.gender);
        // element.cascade = this
        element.value = this.storeService.gender;
      }
      
      if (element.dataSource === "boolean") {
        console.log(element.fieldType);
        console.log(this.storeService.boolean);
        element.value = this.storeService.boolean;
      }

      this.tellerForm.addControl(element?.fieldName, new FormControl(element?.value));
    });
  }

  getSelectValue(selectVal: any) {
    let valueReturned: any;
    valueReturned = selectVal.value;
    this.selectedValue = valueReturned;
    localStorage.setItem('SelectionItem', this.selectedValue);
  }

  public getEmailVal(emailVal: any) {
    let newEmailVal: any;
    newEmailVal = emailVal.checked;
    this.emailValue = emailVal.checked;
    this.jsonArray.custom.email = newEmailVal;
    console.log('this.jsonArray.custom.email', this.jsonArray.custom.email);
    console.log('this.emailValue', this.emailValue);
  }

  public getMinVal(minVal: any) {
    let newminVal: any;
    newminVal = minVal.checked;
    if (newminVal === true) {
      this.showMin = true;
      this.disabledMinlength = false;
      this.hiddenMinlength = false;
    } else {
      this.showMin = false;
      this.disabledMinlength = true;
      this.hiddenMinlength = true;
    }
  }

  public getMaxVal(maxVal: any) {
    let newmaxVal: any;
    newmaxVal = maxVal.checked;
    if (newmaxVal === true) {
      this.showMax = true;
      this.disabledMaxlength = false;
      this.hiddenMaxlength = false;
    } else {
      this.showMax = false;
      this.disabledMaxlength = true;
      this.hiddenMaxlength = true;
    }
  }

  public getRegVal(regVal: any) {
    let newregVal: any;
    newregVal = regVal.checked;
    if (newregVal === true) {
      this.showReg = true;
      this.disabledRegex = false;
      this.hiddenRegex = false;
    } else {
      this.showReg = false;
      this.disabledRegex = true;
      this.hiddenRegex = true;
    }
  }

  public getFieldTypeValue(fieldType: any) {
    let newFieldType: any;
    newFieldType = fieldType.value;
    this.fieldTypeVal = newFieldType;
    console.log('Selected Field Type', this.fieldTypeVal);
    if(this.fieldTypeVal === "date" || this.fieldTypeVal === "text"){
      this.disabledDataSourceValue = true;
      this.jsonArray.dataSource = "none";
    } else {
      this.disabledDataSourceValue = false;
    }
    if(this.fieldTypeVal === "checkbox" || this.fieldTypeVal === "dropdown"){
      this.jsonArray.dataSource = "api";
      this.disabledValidation = true;
      this.jsonArray.validation = "none";
      this.jsonArray.dataType = "none";
    } else {
      this.disabledValidation = false;
    }
  }

  public getDropdownValue(dropVal: any) {
    let newValType: any;
    newValType = dropVal.target.value;
    this.dropDownVal = newValType;
    console.log('Selected Dropdown Value', newValType);
  }

  toggleRequired(reqVal: any) {
    this.reqChecked$.next(!this.reqChecked$.value);
    // console.log(this.reqChecked$.value);
    console.log('Required', reqVal.checked);
  }

  toggleReadonly(redVal: any) {
    this.redChecked$.next(!this.redChecked$.value);
    console.log('Readonly', this.redChecked$.value);

    if (redVal.checked === true) {
      this.jsonArray.fieldType = "text";
      this.disabledFieldValue = true;
      this.disabledDataSourceValue = true;
      this.jsonArray.dataSource = "none";
    } else {
      this.disabledFieldValue = false;
      this.disabledDataSourceValue = false;
    }
  }

  togglePassword(pasVal: any) {
    this.pasChecked$.next(!this.pasChecked$.value);
    // console.log(this.pasChecked$.value);
    console.log('Password', pasVal.checked);

    if (pasVal.checked === true) {
      this.jsonArray.fieldType = "text";
      this.disabledFieldValue = true;
      this.disabledDataSourceValue = true;
      this.jsonArray.dataSource = "none";
    } else {
      this.disabledFieldValue = false;
      this.disabledDataSourceValue = false;
    }
  }

  toggleHidden(hidVal: any) {
    this.hidChecked$.next(!this.hidChecked$.value);
    // console.log(this.hidChecked$.value);
    console.log('Hidden', hidVal.checked);
  }

  toggleAmount(amountVal: any) {
    this.amountChecked$.next(!this.amountChecked$.value);
    // console.log(this.hidChecked$.value);
    console.log('Amount', amountVal.checked);
  }

  getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  openCustom(customContent: any) {
		this.modalReference = this.modalService.open(customContent, { size: 'lg', windowClass: 'my-class' });
    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
	}

  openVal(validateContent: any) {
		this.modalReference = this.modalService.open(validateContent, { size: 'lg', windowClass: 'my-class' });
    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
	}

  openTrig(triggerContent: any) {
		this.modalReference = this.modalService.open(triggerContent, { size: 'lg', windowClass: 'my-class' });
    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
	}

  openDepen(dependentContent: any) {
		this.modalReference = this.modalService.open(dependentContent, { size: 'lg', windowClass: 'my-class' });
    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.getDF();
	}

  openData(dataContent: any) {
		this.modalReference =  this.modalService.open(dataContent, { size: 'lg', windowClass: 'my-class' });
    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
	}

  getDF() {
    const localData = localStorage.getItem('JsonDetails');
    if (localData !== null) {
      this.checklist = false;
      this.customeFieldsArr = JSON.parse(localData);
      const record = Object.values(this.customeFieldsArr).filter((m: any) => m.fieldName !== this.jsonArray.fieldName );
      this.dependentFields = record;
      console.log('dependentFields', this.dependentFields);
      console.log("jsonFormArr", this.customeFieldsArr);
      let result = record.map((item: any) => item.fieldName)
      // console.log(result);
      function setName(item: any, index: any) {
        let name = {"name": item};
        return name
      }
      let output = result.map(setName);
      console.log(output);
    } else {
      this.checklist = true;
    }
  }


  closeCustom() {
    this.jsonArray.validation = 'none';
    this.disabledDataType =  false;
    this.jsonArray.dataType = "alphanumeric";
    this.modalReference.close();
  }

  validateCustom() {
    // if(this.displayCustomVal == "") {
    //   this.bootstrapNotifyService.warning('Provide Custom Value');
    if (this.disabledMinlength === false && this.jsonArray.custom.max.minlength === '') {
      this.bootstrapNotifyService.warning('Provide Minlength Value');
    } else if (this.disabledMaxlength === false && this.jsonArray.custom.max.maxlength === '') {
      this.bootstrapNotifyService.warning('Provide Maxlength Value');
    } else if (this.disabledRegex === false && this.jsonArray.custom.others === '') {
      this.bootstrapNotifyService.warning('Provide Regex Value');
    } else if (this.emailValue === true) {
        this.jsonArray.validation = 'custom';
        return this.modalReference.close();
    } else if (this.disabledMinlength == true || this.disabledMaxlength == true || this.disabledRegex == true && this.emailValue == false) {
      this.jsonArray.validation = 'none';
      return this.modalReference.close();
    } else {
      this.jsonArray.validation = 'custom';
      return this.modalReference.close();
    }


  }

  public getCustom(customType: any){
    let newDisplayName: any;
    newDisplayName = customType.target.value;
    console.log('Custom Value', newDisplayName);
    this.displayCustomVal = newDisplayName;
  }

  public getValidationTypeValue(validationType: any) {
    let newValType: any;
    newValType = validationType.value;
    this.validationTypeVal = newValType;
    console.log('Selected Validation Type', this.validationTypeVal);


    if (this.validationTypeVal === "api") {
      console.log('API Selected');
      this.disabledDataSourceValue = true;
      this.disabledTriggerValue = true;
      this.jsonArray.trigger = "none";
      this.jsonArray.dataSource = "none";
      this.bootstrapNotifyService.info('There can only be 1 form of validation across CUSTOM FORMS, so the TRIGGER and DATASOURCE FIELD will be disabled');
      // this.modalService.open(content, { size: 'sm' });
      // this.openSm(content);
    } else if (this.validationTypeVal === "custom") {
      this.disabledDataType = true;
      this.jsonArray.dataType = "none";
    } else if (this.fieldTypeVal !== "text") {
      this.disabledDataSourceValue = false;
      this.disabledTriggerValue = false;
      this.disabledDataType = false;
    } else if (this.validationTypeVal === "none") {
      console.log("None selected");
      this.disabledDataSourceValue = false;
      this.disabledTriggerValue = false;
      this.disabledDataType = false;
      this.bootstrapNotifyService.info('Trigger/Events set as NONE, so the VALIDATION and DATASOURCE FIELDS are available')
      // this.jsonArray.validation = "primitive";
    }
  }

  closeValidation() {
    if(this.displayValUrl === "" && this.displayValRequest === "" && this.displayValResponse === "") {
      this.jsonArray.validation = 'none';
      this.modalReference.close();
    } else if (this.displayValUrl === "" && this.displayValRequest && this.displayValResponse) {
      this.jsonArray.validation = 'none';
      this.modalReference.close();
    } else if (this.displayValUrl === "" && this.displayValRequest === "" && this.displayValResponse) {
      this.jsonArray.validation = 'none';
      this.modalReference.close();
    } else if (this.displayValUrl && this.displayValRequest === "" && this.displayValResponse === "") {
      this.jsonArray.validation = 'none';
      this.modalReference.close();
    } else if (this.displayValUrl && this.displayValRequest && this.displayValResponse) {
      this.jsonArray.validation = 'none';
      this.modalReference.close();
    }
  }

  public getValidationUrl(val: any) {
    let newDisplayName: any;
    newDisplayName = val.target.value;
    console.log('Name Value', newDisplayName);
    this.displayValUrl = newDisplayName;
    console.log('Final Input Value', this.displayValUrl);
  }

  validateAPI() {
    if(this.displayValUrl == "") {
      this.bootstrapNotifyService.warning('Provide Validation URL');
    } else if(this.isValidUrl(this.displayValUrl) === false){
      this.bootstrapNotifyService.warning("This is not a valid URL");
    // } else if(this.isValidUrl(this.displayValUrl) === false){
    //   this.bootstrapNotifyService.warning("This is not a valid URL");
    } else if(typeof this.displayValRequest !== "object"){
      this.bootstrapNotifyService.warning("This is not a valid JSON Request");
    } else if(typeof this.displayValResponse !== "object") {
      this.bootstrapNotifyService.warning("This is not a valid JSON Response");
    } else {
      return this.modalReference.close();
    }
  }

  public getValRequest(val: any) {
    let newDisplayName: any;
    newDisplayName = val.target.value;
    if(typeof newDisplayName === 'object' && newDisplayName !==null) {
      let uglyJson = JSON.parse(newDisplayName);
      this.displayValRequest = uglyJson;
      // this.displayValRequest = JSON.stringify(uglyJson, undefined, 2);
      // this.jsonArray.validationDetails.validationRequest = this.displayValRequest;
    } else {
      this.displayValRequest = "";
    }
    try {
      const obj = JSON.parse(newDisplayName);
      this.displayValRequest = JSON.stringify(obj, undefined, 2);
      // console.log('Validation Request Value', this.displayValRequest);
      // this.jsonArray.validationDetails.validationRequest = JSON.parse(this.displayValRequest);
      // console.log('Validation Request Value', this.jsonArray.validationDetails.validationRequest);
      // console.log('Validation Request type', typeof this.jsonArray.validationDetails.validationRequest);
    } catch (e) {
      // this.bootstrapNotifyService.warning("This is not a valid JSON Request");
    }
  }

  public getValResponse(val: any) {
    let newDisplayName: any;
    newDisplayName = val.target.value;
    console.log(newDisplayName);
    if(typeof newDisplayName === 'object' && newDisplayName !==null) {
      let uglyJson = JSON.parse(newDisplayName);
      this.displayValResponse = uglyJson;
      // this.displayValResponse = JSON.stringify(uglyJson, undefined, 2);
      // this.jsonArray.validationDetails.validationResponse = this.displayValResponse;
    } else {
      this.displayValResponse = "";
    }
    try {
      const obj = JSON.parse(newDisplayName);
      this.displayValResponse = JSON.stringify(obj, undefined, 2);

      // console.log('Trigger Response Value', this.displayValResponse);
      // this.jsonArray.validationDetails.validationResponse = JSON.parse(this.displayValResponse);
      // console.log('Validation Response Value', this.jsonArray.validationDetails.validationResponse);
      // console.log('Validation Response type', typeof this.jsonArray.validationDetails.validationResponse);
    } catch (e) {
      // this.bootstrapNotifyService.warning("This is not a valid JSON Response");
    }
  }

  closeTrigger() {
    if(this.displayTriggerUrl === "" && this.displayTriggerRequest === "" && this.displayTriggerResponse === "") {
      this.jsonArray.trigger = 'none';
      this.disabledValidation = false;
      this.disabledDataSourceValue = false;
      this.modalReference.close();
      if(this.fieldTypeVal === "checkbox" || this.fieldTypeVal === "dropdown"){
        this.disabledValidation = true;
      } else {
      this.disabledValidation = false;
    }
    } else if (this.displayTriggerUrl === "" && this.displayTriggerRequest && this.displayTriggerResponse) {
      this.jsonArray.trigger = 'none';
      this.disabledValidation = false;
      this.disabledDataSourceValue = false;
      this.displayTriggerRequest = "";
      this.displayTriggerResponse = "";
      this.modalReference.close();
    } else if (this.displayTriggerUrl === "" && this.displayTriggerRequest === "" && this.displayTriggerResponse) {
      this.jsonArray.trigger = 'none';
      this.disabledValidation = false;
      this.disabledDataSourceValue = false;
      this.displayTriggerResponse = "";
      this.modalReference.close();
    } else if (this.displayTriggerUrl && this.displayTriggerRequest === "" && this.displayTriggerResponse === "") {
      this.jsonArray.trigger = 'none';
      this.disabledValidation = false;
      this.disabledDataSourceValue = false;
      this.modalReference.close();
      this.displayTriggerUrl = "";
    } else if (this.displayTriggerUrl && this.displayTriggerRequest && this.displayTriggerResponse === "") {
      this.jsonArray.trigger = 'none';
      this.disabledValidation = false;
      this.disabledDataSourceValue = false;
      this.displayTriggerUrl = "";
      this.displayTriggerRequest = "";
      this.modalReference.close();
    } else if (this.displayTriggerUrl === "" && this.displayTriggerRequest && this.displayTriggerResponse === "") {
      this.jsonArray.trigger = 'none';
      this.disabledValidation = false;
      this.disabledDataSourceValue = false;
      this.displayTriggerRequest = "";
      this.modalReference.close();
    } else if (this.displayTriggerUrl && this.displayTriggerRequest && this.displayTriggerResponse) {
      this.jsonArray.trigger = 'none';
      this.disabledValidation = false;
      this.disabledDataSourceValue = false;
      this.displayTriggerUrl = "";
      this.displayTriggerRequest = "";
      this.displayTriggerResponse = "";
      this.modalReference.close();
    }
  }

  public getTriggers(triggerType: any) {
    let newValType: any;
    newValType = triggerType.value;
    this.triggerTypeVal = newValType;
    console.log('Selected Validation Type', this.triggerTypeVal);

    if (this.triggerTypeVal === "api") {
      console.log('API Selected');
      this.disabledValidation = true;
      this.jsonArray.validation = "none";
      this.disabledDataSourceValue = true;
      this.jsonArray.dataSource = "none";
      this.bootstrapNotifyService.warning('There can only be 1 form of validation across CUSTOM FORMS, so the VALIDATION and DATASOURCE FIELD will be disabled');
      // this.modalService.open(content, { size: 'sm' });
      // this.openSm(content);
    } else if (this.triggerTypeVal === "none") {
      console.log("None selected");
      this.disabledValidation = false;
      this.disabledDataSourceValue = false;
      if (this.validationTypeVal === "none") {
        // this.disabledDataValue = true;
        // this.jsonArray.dataSource = "none"
        if (this.fieldTypeVal === "dropdown") {
          this.disabledDataSourceValue = false;
          this.jsonArray.dataSource = "api"
        }
      } else {
        this.disabledValidation = false;
        this.disabledDataSourceValue = false;
        this.bootstrapNotifyService.info('Trigger/Events set as NONE, so the VALIDATION and DATASOURCE FIELDS are available')
        this.jsonArray.validation = "none";
      }
    }
  }

  public getTriggerUrl(val: any) {
    let newDisplayName: any;
    newDisplayName = val.target.value;
    console.log('Name Value', newDisplayName);
    this.displayTriggerUrl = newDisplayName;
    console.log('Final Input Value', this.displayTriggerUrl);
  }

  validateTrigger() {
    if(this.displayTriggerUrl === "") {
      this.bootstrapNotifyService.warning('Provide Trigger URL');
    } else if(this.isValidUrl(this.displayTriggerUrl) === false){
      this.bootstrapNotifyService.warning("This is not a valid URL");
    } else if(typeof this.displayTriggerRequest !== "object"){
      this.bootstrapNotifyService.warning("This is not a valid JSON Request");
    } else if(typeof this.displayTriggerResponse !== "object") {
      this.bootstrapNotifyService.warning("This is not a valid JSON Response");
    } else {
      return this.modalReference.close();
    }
  }

  public getTriggerRequest(val: any) {
    let newDisplayName: any;
    newDisplayName = val.target.value;
    if(typeof newDisplayName === 'object' && newDisplayName !==null) {
      let uglyJson = JSON.parse(newDisplayName);
      this.displayTriggerRequest = uglyJson;
      // this.displayTriggerRequest = JSON.stringify(uglyJson, undefined, 2);
      // this.jsonArray.triggerDetails.triggerRequest = this.displayTriggerRequest;
    } else {
      this.displayTriggerRequest = "";
    }
    try {
      const obj = JSON.parse(newDisplayName);
      this.displayTriggerRequest = obj;
      // this.displayTriggerRequest = JSON.stringify(obj, undefined, 2);
      // console.log('Trigger Request Value', this.displayTriggerRequest);
      // this.jsonArray.triggerDetails.triggerRequest = JSON.parse(this.displayTriggerRequest);
      // console.log('Trigger Request Value', this.jsonArray.triggerDetails.triggerRequest);
      // console.log('Trigger Request type', typeof this.jsonArray.triggerDetails.triggerRequest);
    } catch (e) {
      this.bootstrapNotifyService.warning("This is not a valid JSON Request");
    }
  }

  public getTriggerResponse(val: any) {
    let newDisplayName: any;
    newDisplayName = val.target.value;
    console.log(newDisplayName);
    if(typeof newDisplayName === 'object' && newDisplayName !==null) {
      let uglyJson = JSON.parse(newDisplayName);
      this.displayTriggerResponse = uglyJson;
      // this.displayTriggerResponse = JSON.stringify(uglyJson, undefined, 2);
      // this.jsonArray.triggerDetails.triggerResponse = this.displayTriggerResponse;

    } else {
      this.displayTriggerResponse = "";
    }
    try {
      const obj = JSON.parse(newDisplayName);
      this.displayTriggerResponse = obj;
      // this.displayTriggerResponse = JSON.stringify(obj, undefined, 2);

      // console.log('Trigger Response Value', this.displayTriggerResponse);
      // this.jsonArray.triggerDetails.triggerResponse = JSON.parse(this.displayTriggerResponse);
      // console.log('Trigger Request Value', this.jsonArray.triggerDetails.triggerResponse);
      // console.log('Trigger Request type', typeof this.jsonArray.triggerDetails.triggerResponse);
    } catch (e) {
      this.bootstrapNotifyService.warning("This is not a valid JSON Response");
    }
  }

  closeDependentFields() {
    this.jsonArray.dependentFieldsDetails.name = "";
    this.jsonArray.dependentFieldsDetails.action = "";
    this.jsonArray.dependentFields = 'none';
    this.modalReference.close();
    // }
  }

  validateDependentFields() {
    if (this.jsonArray.dependentFieldsDetails.name = "") {
      this.bootstrapNotifyService.warning("Select a Trigger for this Custom Field")
    } else if (this.jsonArray.dependentFieldsDetails.action  = "") {
      this.bootstrapNotifyService.warning("Select an action to be taken for this Custom Field")
    } else {
      this.modalReference.close();
      console.log(this.jsonArray.dependentFieldsDetails.name);
      console.log(this.jsonArray.dependentFieldsDetails.action);
    }
  }

  closeContent() {
    if(this.displayDataUrl === "" && this.displayDataRequest === "" && this.displayDataResponse === "") {
      this.jsonArray.dataSource = 'none';
      this.modalReference.close();
    } else if (this.displayDataUrl === "" && this.displayDataRequest && this.displayDataResponse) {
      this.jsonArray.trigger = 'none';
      this.modalReference.close();
    } else if (this.displayDataUrl === "" && this.displayDataRequest === "" && this.displayDataResponse) {
      this.jsonArray.trigger = 'none';
      this.modalReference.close();
    } else if (this.displayDataUrl && this.displayDataRequest === "" && this.displayDataResponse === "") {
      this.jsonArray.dataSource = 'none';
      this.modalReference.close();
    } else if (this.displayDataUrl && this.displayDataRequest && this.displayDataResponse) {
      this.jsonArray.trigger = 'none';
      this.modalReference.close();
    }
  }

  public getDataUrl(val: any) {
    let newDisplayName: any;
    newDisplayName = val.target.value;
    console.log('Name Value', newDisplayName);
    this.displayDataUrl = newDisplayName;
    // console.log('Final Input Value', this.displayVal);
  }

  public getDataRequest(val: any) {
    let newDisplayName: any;
    newDisplayName = val.target.value;
    // console.log(typeof newDisplayName);
    try {
      const obj = JSON.parse(newDisplayName);
      console.log(typeof obj);
      this.displayDataRequest = obj;
      console.log(typeof this.displayDataRequest);
      // console.log('Trigger Request Value', this.displayDataRequest);
    } catch (e) {
      this.bootstrapNotifyService.warning("This is not a valid JSON Request");
      console.log(e);
    }
  }

  public getDataResponse(val: any) {
    let newDisplayName: any;
    newDisplayName = val.target.value;
    try {
      const obj = JSON.parse(newDisplayName);
      console.log(typeof obj);
      this.displayDataResponse = obj;
      console.log(typeof this.displayDataResponse);
      // this.displayDataResponse = JSON.stringify(obj, undefined, 2);
      // console.log('Trigger Response Value', this.displayDataResponse);
    } catch (e) {
      this.bootstrapNotifyService.warning("This is not a valid JSON Response");
      console.log(e);
    }
  }

  validateData() {
    if(this.displayDataUrl === "") {
      this.bootstrapNotifyService.error('Provide DataSource URL');
      this.jsonArray.dataSource = 'none';
    } else if(this.isValidUrl(this.displayDataUrl) === false){
      this.bootstrapNotifyService.warning("This is not a valid URL");
    } else if(typeof this.displayDataRequest !== "object"){
      this.bootstrapNotifyService.error("This is not a valid JSON Request");
      this.jsonArray.dataSource = 'none';
    } else if(typeof this.displayDataResponse !== "object") {
      this.bootstrapNotifyService.error("This is not a valid JSON Response");
      this.jsonArray.dataSource = 'none';
    } else {
      console.log(typeof this.jsonArray.dataSourceDetails.dataSourceRequest);
      console.log(typeof this.jsonArray.dataSourceDetails.dataSourceResponse);
      this.jsonArray.dataSource = 'api';
      return this.modalReference.close();
    }
  }

  resetForm() {
    this.create = true;
    this.update = false;
    this.jsonArray = {
      fieldName: '',
      label: '',
      fieldType: '',
      validation: '',
      validationDetails: {
        validationUrl: '',
        validationRequest: '',
        validationResponse: ''
      },
      custom: {
        email: false,
        max: {
          maxlength: '',
          minlength: ''
        },
        others: ''
      },
      required: false,
      readonly: false,
      password: false,
      hidden: false,
      amount: false,
      trigger: '',
      triggerDetails: {
        triggerUrl: '',
        triggerRequest: '',
        triggerResponse: ''
      },
      dependentFields: '',
      dependentFieldsDetails: [{
          name: '',
          action: ''
        }
      ],
      dataSource: '',
      dataSourceDetails: {
        dataSourceUrl: '',
        dataSourceRequest: '',
        dataSourceResponse: '',
      },
      dataType: '',
      tag: '',
      value: ''
    }
    // this.valueOfDependentFieldsDetails = {};
  }

  getJsonValue() {
    this.loading = false;
    if(this.jsonArray.fieldName == ''){
      this.bootstrapNotifyService.error("Field Name is Required");
    } else if (!this.jsonArray.label) {
      this.bootstrapNotifyService.error("Label is Required");
    } else if (!this.jsonArray.fieldType) {
      this.bootstrapNotifyService.error("Field Type is Required");
    } else if (this.fieldTypeVal === "checkbox" && !this.displayDataUrl && !this.displayDataRequest && !this.displayDataResponse ) {
      this.jsonArray.dataSource = "none";
      if (this.jsonArray.dataSource === "none") {
        this.bootstrapNotifyService.error('DataSource API, Request and Response Payloads Need to be inputed else change FIELD TYPE');
      }
    } else if (!this.jsonArray.validation) {
      this.bootstrapNotifyService.error("Validation value is Required");
    } else if (this.jsonArray.validation === "api" && !this.jsonArray.validationDetails.validationUrl && !this.jsonArray.validationDetails.validationRequest && !this.jsonArray.validationDetails.validationResponse ) {
      this.bootstrapNotifyService.error('Validation API, Request and Response Payloads Need to be inputed else change VALIDATION TYPE');
    } else if (!this.jsonArray.trigger) {
      this.bootstrapNotifyService.error("Trigger value is Required");
    } else if (this.jsonArray.trigger === "api" && !this.jsonArray.triggerDetails.triggerUrl && !this.jsonArray.triggerDetails.triggerRequest && !this.jsonArray.triggerDetails.triggerResponse ) {
      this.bootstrapNotifyService.error('Trigger API, Request and Response Payloads Need to be inputed else change TRIGGER TYPE');
    } else if (!this.jsonArray.dependentFields) {
      this.bootstrapNotifyService.error("Dependent Fields value is Required");
    // } else if (this.jsonArray.dependentFields === "dependent" && !this.jsonArray.dependentFieldsDetails.name && !this.jsonArray.dependentFieldsDetails.action) {
    //   this.bootstrapNotifyService.error('Dependent Fields Name and Action Need to be selected else change DEPENDENT FIELDS TYPE');
    } else if (!this.jsonArray.dataSource) {
      this.bootstrapNotifyService.error("DataSource value is Required");
    } else if (this.jsonArray.dataSource === "api" && !this.displayDataUrl && !this.displayDataRequest && !this.displayDataResponse) {
      this.bootstrapNotifyService.warning('DataSource API, Request and Response Payloads Need to be inputed else change FIELD TYPE.');
    } else if (!this.jsonArray.dataType) {
      this.bootstrapNotifyService.error("DataType value is Required");
    } else {
      this.loading = true;
      console.log('Json Details', this.jsonArray);
      if(this.validationTypeVal === "api" && typeof this.jsonArray.validationDetails.validationRequest === "object") {
        this.displayValRequest = JSON.stringify(this.displayValRequest, undefined, 2);
      } else if(this.validationTypeVal === "api" && typeof this.jsonArray.validationDetails.validationResponse === "object") {
        this.displayValResponse = JSON.stringify(this.displayValResponse, undefined, 2);
      } else if(this.triggerTypeVal === "api" && typeof this.jsonArray.triggerDetails.triggerRequest === "object") {
        this.displayTriggerRequest = JSON.stringify(this.displayTriggerRequest, undefined, 2);
      } else if(this.triggerTypeVal === "api" && typeof this.jsonArray.triggerDetails.triggerResponse === "object") {
        this.displayTriggerResponse = JSON.stringify(this.displayTriggerResponse, undefined, 2);
      } else if(this.jsonArray.dataSource === "api" && typeof this.jsonArray.dataSourceDetails.dataSourceRequest === "object") {
        this.displayDataRequest = JSON.stringify(this.displayDataRequest, undefined, 2);
      } else if(this.jsonArray.dataSource === "api" && typeof this.jsonArray.dataSourceDetails.dataSourceResponse === "object") {
        this.displayDataResponse = JSON.stringify(this.displayDataResponse, undefined, 2);
      }
      this.customeFieldsArr.push(Object.assign({}, this.jsonArray));
      // this.jsonFormArr.push({... this.jsonArray});
      this.storeService.jsonDetails = this.customeFieldsArr;
      // localStorage.setItem('JsonDetails', JSON.stringify(this.jsonFormArr));
      // this.dialogRef.close();
      this.loading = false;

      this.storageData.push(Object.assign({}, this.jsonArray));
      localStorage.setItem('JsonDetails', JSON.stringify(this.storageData));
      this.number = Object.values(this.storageData).length;
      console.log(this.number);
      // this.number ? null || undefined : 0;
      this.onDataChange.emit(this.number);
      this.bootstrapNotifyService.success(this.jsonArray.label + " Custom Field Created Successfully");
      this.resetForm();
    }
  }

  updateJsonValue() {
    this.loading = false;
    console.log('Json Details', this.jsonArray);
    if(this.jsonArray.fieldName == ''){
      this.bootstrapNotifyService.error("Field Name is Required");
    } else if (!this.jsonArray.label) {
      this.bootstrapNotifyService.error("Label is Required");
    } else if (!this.jsonArray.fieldType) {
      this.bootstrapNotifyService.error("Field Type is Required");
    } else if (!this.jsonArray.validation) {
      this.bootstrapNotifyService.error("Validation is Required");
    } else if (!this.jsonArray.validation) {
      this.bootstrapNotifyService.error("Validation is Required");
    } else if (this.jsonArray.validation === "api" && !this.jsonArray.validationDetails.validationUrl && !this.jsonArray.validationDetails.validationRequest && !this.jsonArray.validationDetails.validationResponse ) {
      this.bootstrapNotifyService.error('Validation API, Request and Response Payloads Need to be inputed else change VALIDATION TYPE')
    } else if (this.fieldTypeVal === "checkbox" && !this.jsonArray.dataSourceDetails.dataSourceUrl && !this.jsonArray.dataSourceDetails.dataSourceRequest && !this.jsonArray.dataSourceDetails.dataSourceResponse ) {
      this.bootstrapNotifyService.error('DataSource API, Request and Response Payloads Need to be inputed else change FIELD TYPE');
    } else if (this.jsonArray.dataSource === "api" && !this.jsonArray.dataSourceDetails.dataSourceUrl && !this.jsonArray.dataSourceDetails.dataSourceRequest && !this.jsonArray.dataSourceDetails.dataSourceResponse) {
      this.bootstrapNotifyService.warning('DataSource API, Request and Response Payloads Need to be inputed else change FIELD TYPE.')
    } else {
      this.loading = true;
      console.log('Updated Json Details', this.jsonArray);
      const record = this.storageData.find((m: any) => m.label == this.jsonArray.label);
      console.log(record);
      record.label = this.jsonArray.label;
      localStorage.setItem('JsonDetails',JSON.stringify(this.storageData));
      this.number = Object.values(this.storageData).length;
      console.log(this.number);
      this.onDataChange.emit(this.number);
      this.bootstrapNotifyService.success(this.jsonArray.label + " Updated Successfully");
      this.loading = false;
      this.resetForm();
    }
  }

  editField(row: any) {
    // console.log('storageData', this.storageData);
    console.log('edit json row', row);
    this.jsonArray = row;
    // let record = this.storageData.find((x: any) => x.label === row.label);
    // console.log('json obj', record);
    // let format = JSON.stringify(record);
    // localStorage.getItem('JsonDetails');
    this.create = false;
    this.update = true;
    // console.log('format obj', format)
    // this.jsonArray = format;
  }

  deleteField(row: any) {
    console.log('delete json row', row);
    for (let i = 0; i < this.storageData.length; i++) {
      console.log(this.storageData[i]);
      if(this.storageData[i].label === row.label) {
        console.log(row);
        this.storageData.splice(i, 1);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 500);  // .5s
      }
     }
     localStorage.setItem('JsonDetails', JSON.stringify(this.storageData));
     this.number = Object.values(this.storageData).length;
     console.log(this.number);
     if (this.number < 1) {
       localStorage.removeItem('JsonDetails');
     }
     this.onDataChange.emit(this.number);
  }

}
