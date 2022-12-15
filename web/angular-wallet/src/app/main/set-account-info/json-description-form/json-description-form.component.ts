import {
  Component,
  EventEmitter,
  Input, OnChanges, OnInit,
  Output, SimpleChanges, ViewChild
} from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-json-description-form',
  templateUrl: './json-description-form.component.html',
  styleUrls: ['./json-description-form.component.scss']
})
export class JsonDescriptionFormComponent implements OnInit, OnChanges {
  public editorOptions: JsonEditorOptions;
  public data: any;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

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

  constructor() {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code'; // set all allowed modes
  }


  onDescriptionChanged($event: any): void {
    if ($event instanceof Event){
      // no op
    } else{
      console.log('changed - t', $event);
      this.description = JSON.stringify($event);
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.description.previousValue !== changes.description.currentValue) {
      console.log('changes', changes);
      try {
        this.data = JSON.parse(changes.description.currentValue);
      } catch (e) {
        console.log('error', e);
        this.data = {};
      }
    }
  }
}
