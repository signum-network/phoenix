import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-src44-description-form',
  templateUrl: './src44-description-form.component.html',
  styleUrls: ['./src44-description-form.component.scss']
})
export class Src44DescriptionFormComponent {
  @Input()
  disabled: boolean;

  descriptionValue: string;
  @Input()
  get description(): string {
    return this.descriptionValue;
  }

  @Output()
  descriptionChange = new EventEmitter();

  set description(descriptionValue: string) {
    this.descriptionValue = descriptionValue;
    this.descriptionChange.next(this.descriptionValue);
  }
}
