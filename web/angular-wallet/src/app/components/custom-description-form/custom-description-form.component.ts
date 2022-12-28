import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-custom-description-form',
  templateUrl: './custom-description-form.component.html',
  styleUrls: ['./custom-description-form.component.scss']
})
export class CustomDescriptionFormComponent{
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
