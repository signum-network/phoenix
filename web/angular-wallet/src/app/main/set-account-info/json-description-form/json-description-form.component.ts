import {
  Component,
  EventEmitter,
  Input, OnChanges,
  Output, SimpleChanges, ViewChild
} from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { DescriptorData } from '@signumjs/standards';

@Component({
  selector: 'app-json-description-form',
  templateUrl: './json-description-form.component.html',
  styleUrls: ['./json-description-form.component.scss']
})
export class JsonDescriptionFormComponent implements OnChanges {
  public editorOptions: JsonEditorOptions;
  public data: any;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

  @Input()
  disabled: boolean;

  descriptionValue: string;

  isOk = true;

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

  isSRC44 = false;
  hasChanged = false;

  constructor() {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = this.disabled ? 'view' : 'code'; // set all allowed modes
  }


  onDescriptionChanged($event: any): void {
    this.hasChanged = true;
    this.isOk = this.editor.isValidJson();
    if (this.isOk) {
      this.validateSRC44($event);
    }
    else {
      this.isSRC44 = false;
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.editorOptions.mode = this.disabled ? 'view' : 'code'; // set all allowed modes
    if (changes.description.previousValue !== changes.description.currentValue) {
      try {
        this.data = JSON.parse(changes.description.currentValue);
        this.validateSRC44(this.data);
      } catch (e) {
        this.data = {};
      }
    }
  }

  private validateSRC44(json: object): void {
    try {
      DescriptorData.parse(JSON.stringify(json));
      this.isSRC44 = true;
    } catch (e) {
      this.isSRC44 = false;
    }
  }

  commit(): void {
    if (this.isOk) {
      this.description = JSON.stringify(this.editor.get());
      this.isOk = false;
      this.hasChanged = false;
    }
  }
}
