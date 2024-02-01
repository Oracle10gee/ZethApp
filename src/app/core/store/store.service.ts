import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  fieldTypes = [
    {
      'name': 'DATE',
      'value': 'date'
    },
    {
      'name': 'DROPDOWN',
      'value': 'dropdown'
    },
    {
      'name': 'TEXT FIELD',
      'value': 'text'
    },
    {
      'name': 'CHECK BOX',
      'value': 'checkbox'
    }
  ]

  gender: any =
  [
    {
      'id': '1',
      'name': 'Male'
    },
    {
      'id': '2',
      'name': 'Female'
    }
  ]

  // gender: any =
  // [
  //   "Male", "Female"
  // ]

  boolean: any =
  [
    {
      'id': '1',
      'name': 'True'
    },
    {
      'id': '2',
      'name': 'False'
    }
  ]

  // boolean: any =
  // [
  //   "True", "False"
  // ]

  jsonDetails: any;

  constructor() { }
}
