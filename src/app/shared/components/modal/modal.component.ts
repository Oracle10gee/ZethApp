import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() modalIcon!: string;
  @Input() modalHeaderTitle!: string;
  @Input() modalMessage1!: string;
  @Input() modalMessage2!: string;
  @Input() actionBtnText!: string;
  @Output() modalAction: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,) {}
  ngOnInit(): void {}

  closeModal(): void {
    this.dialog.closeAll();
  }

  emitModalAction(){
    this.modalAction.emit();
  }

}
