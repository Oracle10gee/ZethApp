import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export interface ItemData {
  item: string;
  selected: boolean;
}
@Component({
  selector: 'app-narration',
  templateUrl: './narration.component.html',
  styleUrls: ['../../../../../../../assets/css/angularMaterial.css', './narration.component.css']
})
export class NarrationComponent implements OnInit {
  @Output() result = new EventEmitter<{ key: string, data: Array<string> }>();

  selectOptions: Array<string> = [];
  fieldnames: any[] = [];
  fields: any[] = [];
  delimeterOptions: Array<string> = ['//', '#', '&', "'"];
  selectData: Array<ItemData> = [];
  delimeter: string = '';

  constructor() {

  }

  ngOnInit(): void {
    // let fieldnames = localStorage.getItem("JsonDetails")??"";
    // this.fields = JSON.parse(fieldnames)
    // this.fields.map(
    //   (x) => {
    //     this.fieldnames.push( x.fieldName )
    // })
  }

  changeDelimeter(value: any){
    this.delimeter = value;
  }

  removeChip = (data: ItemData ): void => {
    const objWithIdIndex = this.selectData.findIndex((obj) => obj.item === data.item);
    if (objWithIdIndex > -1) {
      this.selectData.splice(objWithIdIndex, 1);
    }
  };

  addField(name: string){
    let data: ItemData = {
      item: name,
      selected: true
    }
    let filteredItems = this.selectData.filter(x => x.item == data.item)
    if(filteredItems.length == 0){
      this.selectData.push(data)
    }else{
      alert(data.item + ' has been selected before')
    }
  }


}
