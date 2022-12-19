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
import { UnsubscribeOnDestroy } from '../../../util/UnsubscribeOnDestroy';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-src44-description-form',
  templateUrl: './src44-description-form.component.html',
  styleUrls: ['./src44-description-form.component.scss']
})
export class Src44DescriptionFormComponent extends UnsubscribeOnDestroy implements OnInit, OnChanges {
  avatarTypeOptions = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ];

  accountTypeOptions = [
    'hum',
    'bot',
    'biz',
    'cex',
    'dex',
    'oth'
  ];

  form = new FormGroup({
    name: new FormControl(''),
    type: new FormControl('hum'),
    desc: new FormControl(''),
    avatar: new FormControl(''),
    avatarType: new FormControl(''),
    alias: new FormControl(''),
    homepage: new FormControl('')
  });

  @Input()
  disabled: boolean;

  @Input()
  name: string;

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

  set description(descriptionValue: string) {
    this.descriptionString = descriptionValue;
    this.descriptionChange.next(this.descriptionString);
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((formData) => {
      this.updateDescriptor(formData);
    });
  }

  ngOnChanges({ description, name }: SimpleChanges): void {
    if (name && name.previousValue !== name.currentValue) {
      this.src44Json['nm'] = name.currentValue;
      // :facepalm
      setTimeout(() => {
        this.form.patchValue({ name });
      });
    }

    if (description && description.previousValue !== description.currentValue) {
      try {
        const data = DescriptorData.parse(this.descriptionString, false);
        this.src44Json = data.raw;
        this.form.patchValue({
          type: data.type || 'hum',
          desc: data.description,
          avatar: data.avatar ? data.avatar.ipfsCid : '',
          avatarType: data.avatar ? data.avatar.mimeType : 'image/png',
          homepage: data.homePage,
          alias: data.alias
        });
        this.updateAvatarImage(data.avatar ? data.avatar.ipfsCid : '');
      } catch (e) {

        console.error(e);
        // not compliant data will be ignored
      }
    }
  }

  private updateAvatarImage(cid: string): void {
    if (cid) {
      this.avatarImgSource = `https://ipfs.io/ipfs/${cid}`;
    }
  }

  private updateDescriptor(formData: any): void {

    const mergeable: any = {
      tp: formData.type || undefined,
      av: formData.avatar ? { [formData.avatar]: formData.avatarType } : undefined,
      hp: formData.homepage || undefined,
      al: formData.alias || undefined,
      ds: formData.desc || undefined
    };

    this.updateAvatarImage(formData.avatar);

    this.src44Json = {
      ...this.src44Json,
      ...mergeable
    };

    try {
      const d = DescriptorData.parse(JSON.stringify(this.src44Json));
      this.description = d.stringify();
    } catch (e) {
      console.error('data not valid', e.message);
    }

  }

  private fetchAvatarMimeType(): void {
    fetch(this.avatarImgSource).then(response => {
      if (response.ok) {
        const avatarType = response.headers.get('content-type') || '';
        this.form.patchValue({
          avatarType
        });
      }
    });
  }

  onImageLoaded(): void {
    this.isLoadingImage = false;
    this.fetchAvatarMimeType();
  }

  onImageError(): void {
    this.isLoadingImage = false;
  }
}
