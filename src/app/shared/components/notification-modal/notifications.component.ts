import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {}

  @Input() modalIcon!: string;
  @Input() modalHeaderTitle!: string;
  @Input() modalMessage!: string;

  
  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

}
