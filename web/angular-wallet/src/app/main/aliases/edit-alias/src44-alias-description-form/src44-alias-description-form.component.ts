import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { DescriptorData, SRC44Descriptor } from '@signumjs/standards';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { NetworkService } from '../../../../network/network.service';

@Component({
  selector: 'app-src44-alias-description-form',
  templateUrl: './src44-alias-description-form.component.html',
  styleUrls: ['./src44-alias-description-form.component.scss']
})
export class Src44AliasDescriptionFormComponent extends UnsubscribeOnDestroy implements OnInit, OnChanges {
  form = new FormGroup({
    account: new FormControl(''),
    name: new FormControl(''),
    desc: new FormControl(''),
    alias: new FormControl(''),
    homepage: new FormControl('')
  });

  @Input()
  disabled: boolean;

  descriptionString: string;
  isLoadingImage = false;


  @Input()
  get description(): string {
    return this.descriptionString;
  }

  @Output()
  descriptionChange = new EventEmitter();

  avatarImgSource: string;

  private src44Json: SRC44Descriptor = { vs: 1 };
  src44ErrorMsg = '';

  set description(descriptionValue: string) {
    this.descriptionString = descriptionValue;
    this.descriptionChange.next(this.descriptionString);
  }

  constructor(private networkService: NetworkService) {
    super();
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((formData) => {
      this.updateDescriptor(formData);
    });
  }

  ngOnChanges({ description }: SimpleChanges): void {
    if (description && description.previousValue !== description.currentValue) {
      try {
        const data = DescriptorData.parse(description.currentValue, false);
          this.src44Json = data.raw;
          this.form.patchValue({
            name: data.name,
            account: data.account,
            desc: data.description,
            homepage: data.homePage,
            alias: data.alias
          });
      } catch (e) {
        // not compliant data will be ignored
      }
    }
  }

  private updateDescriptor(formData: any): void {
    this.src44ErrorMsg = '';
    const mergeable: any = {
      nm: formData.name || undefined,
      ac: formData.account || undefined,
      hp: formData.homepage || undefined,
      al: formData.alias || undefined,
      ds: formData.desc || undefined
    };


    this.src44Json = {
      ...this.src44Json,
      ...mergeable
    };

    try {
      const d = DescriptorData.parse(JSON.stringify(this.src44Json));
      this.description = d.stringify();
    } catch (e) {
      this.src44ErrorMsg = e.message;
    }

  }
}
