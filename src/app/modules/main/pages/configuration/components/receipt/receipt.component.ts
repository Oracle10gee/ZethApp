import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jsonValidator } from './validation/json-validator';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: [
    '../../../../../../../assets/css/angularMaterial.css',
    './receipt.component.css',
  ],
})
export class ReceiptComponent implements OnInit {
  selectedOption: string = '';
  receiptSelected: any;
  // selectedFile: any;
  selectedCustomFiles: any;
  // selectedStandardFiles?: FileList;
  selectedStandardFiles: any;
  formErrors: any = {};
  fieldsData: any[] = [];

  receipts: any[] = [
    { value: 'receipt-0', viewValue: 'API' },
    { value: 'receipt-1', viewValue: 'Standard' },
    { value: 'receipt-2', viewValue: 'Custom' },
  ];

  furtherProcessingField: any[] = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  receiptItems: any[] = [
    { id: '1', itemName: 'item 1' },
    { id: '2', itemName: 'item 2' },
    { id: '3', itemName: 'item 3' },
    { id: '4', itemName: 'item 4' },
  ];

  ApiDetailsForm = new FormGroup({
    enterUrl: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^https?://[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$'
      ),
    ]),
    merchantId: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
    secretKey: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]),
    request: new FormControl('', [Validators.required, jsonValidator()]),
    response: new FormControl('', [Validators.required, jsonValidator()]),
  });

  StandardReceipt = new FormGroup({
    receiptTitle: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]+$/),
    ]),
    customField: new FormControl('', [Validators.required]),
    furtherProcessing: new FormControl(''),
    // barCodeSetup: new FormControl(''),
    instruction: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]+$/),
    ]),
    uploadLogo: new FormControl('', [Validators.required]),
  });

  CustomReceiptForm = new FormGroup({
    customField: new FormControl('', [Validators.required]),
    uploadTemplate: new FormControl('', [Validators.required]),
  });

  constructor() {
    const jsonData = localStorage.getItem('JsonDetails') as string;
    if (jsonData) {
      this.fieldsData = JSON.parse(jsonData); // Retrieve JSON from Local Storage
    }
  }

  ngOnInit(): void {}

  public getReceiptType(receiptType: any) {
    let newValType: any;
    newValType = receiptType.value;
    console.log('Selected Payment Val', newValType);
    this.receiptSelected = newValType;
  }

  // onFileSelected(event: any) {
  //   const files: FileList = event.target.files;
  //   if (files.length > 0) {
  //     this.selectedFile = files[0];
  //   }
  // }

  getAPIFormValidationErrors() {
    const errors: { [key: string]: any } = {};
    Object.keys(this.ApiDetailsForm.controls).forEach((key) => {
      const controlErrors = this.ApiDetailsForm.get(key)!.errors;
      if (controlErrors != null) {
        errors[key] = Object.keys(controlErrors).map(
          (keyError) => key + ' ' + keyError
        );
      }
    });
    return errors;
  }
  getStandardValidationErrors() {
    const errors: { [key: string]: any } = {};
    Object.keys(this.StandardReceipt.controls).forEach((key) => {
      const controlErrors = this.StandardReceipt.get(key)!.errors;
      if (controlErrors != null) {
        errors[key] = Object.keys(controlErrors).map(
          (keyError) => key + ' ' + keyError
        );
      }
    });
    return errors;
  }
  getCustomValidationErrors() {
    const errors: { [key: string]: any } = {};
    Object.keys(this.CustomReceiptForm.controls).forEach((key) => {
      const controlErrors = this.CustomReceiptForm.get(key)!.errors;
      if (controlErrors != null) {
        errors[key] = Object.keys(controlErrors).map(
          (keyError) => key + ' ' + keyError
        );
      }
    });
    return errors;
  }

  onApiSubmit() {
    if (this.ApiDetailsForm.invalid) {
      this.formErrors = this.getAPIFormValidationErrors();
    } else {
      this.formErrors = {};
    }
    const data = [
      {
        enterUrl: this.ApiDetailsForm.get('enterUrl')?.value,
        merchantId: this.ApiDetailsForm.get('merchantId')?.value,
        secretKey: this.ApiDetailsForm.get('secretKey')?.value,
        request: this.ApiDetailsForm.get('request')?.value,
        response: this.ApiDetailsForm.get('response')?.value,
      },
    ];
    localStorage.setItem('ApiDetails', JSON.stringify(data));
    console.log('ReceiptApiDetails', data);
  }

  selectCustomFile(event: any) {
    this.selectedCustomFiles = event.target.files;
  }
  selectStandardFile(event: any) {
    this.selectedStandardFiles = event.target.files;
  //   const file = this.selectedStandardFiles?.item(0);
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const fileContent = e.target.result;
  //     if (file?.name && file?.type) 
  //     this.StandardReceipt.patchValue({
  //       logo: {
  //         filename: file.name,
  //         filetype: file.type,
  //         fileContent: fileContent.split(',')[1]
  //       }
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // }
  }

  onCustomSubmit() {
    if (this.CustomReceiptForm.invalid) {
      this.formErrors = this.getCustomValidationErrors();
    } else {
      this.formErrors = {};
    }

    const CustomData = {
      customField: this.CustomReceiptForm.value.customField,
      uploadTemplate: this.selectedCustomFiles.item(0)?.name,
    };

    const customFormData = JSON.parse(
      localStorage.getItem('CustomData') || '[]'
    );
    customFormData.push(CustomData);
    localStorage.setItem('CustomData', JSON.stringify(customFormData));

    this.CustomReceiptForm.reset();
    this.selectedCustomFiles = null;

    console.log('CustomReceiptDetails', CustomData);
  }

  onStandardSubmit() {
    if (this.StandardReceipt.invalid) {
      this.formErrors = this.getStandardValidationErrors();
    } else {
      this.formErrors = {};
    }

    const StandardData = {
      receiptTitle: this.StandardReceipt.value.receiptTitle,
      customField: this.StandardReceipt.value.customField,
      furtherProcessing: this.StandardReceipt.value.furtherProcessing,
      barCodeSetup: this.StandardReceipt.value.barCodeSetup,
      instruction: this.StandardReceipt.value.instruction,
      uploadLogo: this.selectedStandardFiles.item(0)?.name,
    };

    const standardformdata = JSON.parse(
      localStorage.getItem('StandardData') || '[]'
    );
    standardformdata.push(StandardData);
    localStorage.setItem('StandardData', JSON.stringify(standardformdata));

    this.StandardReceipt.reset();
    this.selectedStandardFiles = null;

    console.log('StandardReceiptDetails', StandardData);
  }
  onOptionSelected(option: string) {
    this.selectedOption = option;
    
}
  }
  
