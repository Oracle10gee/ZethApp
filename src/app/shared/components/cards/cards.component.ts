import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <mat-card>
      <mat-card-content>
        <p>{{CardTitle}}</p>
        <br>
        <p class="text-3xl font-semibold">{{CardNumber}}</p>
        <br>
        <a routerLink="{{CardLink}}" class="{{CardClass}}">
          {{CardLinkTitle}}
        </a>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['../../../../assets/css/angularMaterial.css']
})


export class CardComponent implements OnInit {
  @Input() CardTitle!: string;
  @Input() CardNumber!: number;
  @Input() CardLink!: any;
  @Input() CardClass!: any;
  @Input() CardLinkTitle!: string;
  // @Input() Colors!: any;

  constructor() {

  }

  ngOnInit(): void {

  }

}
