import { Component, Input, OnInit, EventEmitter, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card-container-two',
  template: `
  <div class="border-radius-8"  style="border: 4px solid #6200EE;">
    <div class="grid-container-auto" style="padding: 4% 5% 4.6% 5%;">
      <div class="">
        <h2 class="margin-auto text-left">{{HeaderTextLeft}}</h2>
        <!-- <h2 class="margin-auto text-left">New Fields</h2> -->
        <!-- <br> -->
      </div>
      <div class="margin-auto">
      </div>
    </div>


    <div>
      <hr class="m-0">

      <ng-container [ngTemplateOutlet]="optionTemplate"></ng-container>

    </div>
  </div>
`,
styleUrls: ['../../../../assets/css/angularMaterial.css']
})


export class CardContainerTwoComponent implements OnInit {
@Input() HeaderTextLeft!: string;
@Input() HeaderTextRight!: string;
@Input() optionTemplate!: TemplateRef<any>;
// @Input() CardTitle!: string;
// @Input() CardNumber!: number;
@Input() CardLink!: any;
// @Input() CardClass!: any;
// @Input() CardLinkTitle!: string;
// @Input() Colors!: any;

// @Output() onClicked: EventEmitter<void> = new EventEmitter();

constructor() {

}

ngOnInit(): void {

}

}
