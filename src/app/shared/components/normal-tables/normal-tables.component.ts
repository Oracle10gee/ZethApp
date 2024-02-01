import { Component, Input, OnInit, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '../../models/tableColumns';

@Component({
  selector: 'app-normal-table',
  template: `

  `,
 styleUrls: ['../normal-tables/normal-tables.component.css']
})


export class NormalTableComponent implements OnInit {





  // this property needs to have a setter, to dynamically get changes from parent component


  constructor() {

  }

  ngOnInit(): void {

  }

  // we need this, in order to make pagination work with *ngIf




}
