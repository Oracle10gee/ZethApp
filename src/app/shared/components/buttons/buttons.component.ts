import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  ngOnInit(): void {
  }

  @Input() set text(name: string) {
		this.buttonText = name.toUpperCase();
	}
	get name(): string {
		return this.buttonText;
	}

	@Input() color: string = '0068B4';
	@Input() type: string = 'button';
  @Output() btnClick = new EventEmitter();
  @Input() isDisabled = false;

	public buttonText = '';

	constructor() {}

  onClick() {
		this.btnClick.emit();
	}

}
