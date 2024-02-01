import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-further-processing',
  templateUrl: './further-processing.component.html',
  styleUrls: ['../../../../../../../assets/css/angularMaterial.css', './further-processing.component.css']
})
export class FurtherProcessingComponent implements OnInit {
  apiCallType: string = '';
  selectedFields: any[] = [];
  fgForm!: FormGroup
  multiSelect = new FormControl('')
  returnFields: string[] = [];
  fields!: string [];
  model = { name: '' };
  returnedDynamicForm!: FormGroup
  showForm: boolean = false;
  count = 1

 constructor(public fb: FormBuilder) {}

  /* Reactive form */
  reactiveForm() {
    this.fgForm = this.fb.group({
      url: [''],
      request: [''],
      response: [''],
      apikey: [''],
      returnedFields: ['']
    });
    // const formGroupFields = this.addInput();
    // this.returnedDynamicForm = new FormGroup();
  }

  ngOnInit(): void {
    this.reactiveForm();

  }

  submitForm(){
    this.fgForm.value.returnedFields = this.returnFields
    localStorage.setItem('fgForm', JSON.stringify(this.fgForm.value))
    console.log(this.fgForm.value)
  }

  generateForm(){
    this.showForm = true
  }

  addInput(){
    this.count++

    // let  formGroupFields: any;
    //     for (const field of Object.keys(this.model)) {
    //         formGroupFields.field = new FormControl("");
    //         this.fields.push(field);
    //     }
    //     return formGroupFields;
  }

  getValue(value: any){
    this.returnFields = value
    console.log(value)
  }
  selectFields(value: any){
    this.selectedFields.push(value)
  }

  changeApiCallType(value: any){
    this.apiCallType = value
  }
}
