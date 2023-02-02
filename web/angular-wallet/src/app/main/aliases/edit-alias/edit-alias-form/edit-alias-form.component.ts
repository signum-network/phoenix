import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SuggestedFees, TransactionType, TransactionArbitrarySubtype, Alias } from '@signumjs/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {I18nService} from 'app/shared/services/i18n.service';
import { Amount } from '@signumjs/util';
import {handleException} from 'app/util/exceptions/handleException';
import { WalletAccount } from 'app/util/WalletAccount';
import { isTextIsJson } from 'app/util/isTextIsJson';
import { isTextIsSrc44 } from 'app/util/isTextIsSrc44';
import { NetworkService } from 'app/network/network.service';
import { AliasService } from '../../alias.service';
import { takeUntil } from "rxjs/operators";
import { StoreService } from "../../../../store/store.service";


@Component({
  selector: 'app-edit-alias-form',
  templateUrl: './edit-alias-form.component.html',
  styleUrls: ['./edit-alias-form.component.scss']
})
export class EditAliasFormComponent implements OnInit, OnChanges {

  @Input() alias?: Alias;
  @Input() aliasName?: string;
  @Input() account: WalletAccount;
  @Input() fees: SuggestedFees;

  @Input() readOnly?: boolean;

  description = {
    src44: '',
    json: '',
    custom: ''
  };
  formatTypeOptions: string[] = ['src44', 'json', 'custom'];
  formatType: FormControl = new FormControl('src44');

  pin = '';
  fee = '';
  txType = TransactionType.Arbitrary;
  txSubtype = TransactionArbitrarySubtype.AliasAssignment;
  isSending = false;

  immutable = false;

  constructor(private route: ActivatedRoute,
              private aliasService: AliasService,
              private notifierService: NotifierService,
              private networkService: NetworkService,
              private i18nService: I18nService,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.alias){
        this.detectFormat();
      }
    }, 0);
  }



  async onSubmit(event): Promise<void> {
    this.isSending = true;
    event.stopImmediatePropagation();
    try {
       await this.aliasService.setAlias({
         aliasName: this.alias ? this.alias.aliasName : this.aliasName,
         aliasURI: this.getDescription(),
         feeNQT: Amount.fromSigna(this.fee).getPlanck(),
         pin: this.pin,
         keys: this.account.keys,
       });
       this.notifierService.notify('success', this.i18nService.getTranslation('success_alias_update'));
       await this.router.navigate(['/dashboard'], );
    } catch (e) {
      handleException({
        e,
        i18nService: this.i18nService,
        notifierService: this.notifierService
      });
    } finally {
      this.isSending = false;
    }
  }

  getDescription(): string {
    // @ts-ignore
    return this.description[this.formatType.value] || '';
  }
  isTooLong(): boolean {
    return this.getDescription().length + 32 >= 1000;
  }

  canSubmit(): boolean {
    return this.pin.length > 0 && !this.isTooLong();
  }

  setPin(pin: string): void {
    this.pin = pin;
  }

  getPayloadLength(): number {
    const description = this.getDescription();
    return (description ? description.length : 0) + 32;
  }

  private detectFormat(): void {
    let format = 'custom';
    this.description.custom = this.alias.aliasURI;

    if (isTextIsJson(this.alias.aliasURI)) {
      format = 'json';
      this.description.json = this.alias.aliasURI;
    }

    // most relevant.... so it comes last
    if (isTextIsSrc44(this.alias.aliasURI)) {
      format = 'src44';
      this.description.src44 = this.alias.aliasURI;
    }

    this.formatType.setValue(this.alias.aliasURI ? format : 'src44');
  }

  ngOnChanges({ readOnly }: SimpleChanges): void {
    this.immutable = this.account.type === 'offline';
    if (readOnly && readOnly.previousValue !== readOnly.currentValue){
      this.immutable = readOnly.currentValue;
    }

  }
}
