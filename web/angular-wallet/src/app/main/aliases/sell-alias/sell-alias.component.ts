import { Component, OnInit } from '@angular/core';
import {
  SuggestedFees,
  Alias,
  Address,
  TransactionType,
  TransactionArbitrarySubtype
} from '@signumjs/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletAccount } from 'app/util/WalletAccount';
import { Amount } from '@signumjs/util';
import { constants } from '../../../constants';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { I18nService } from '../../../layout/components/i18n/i18n.service';
import { StoreService } from '../../../store/store.service';
import { takeUntil } from 'rxjs/operators';
import { getBalancesFromAccount, AccountBalances } from 'app/util/balance';
import {
  Recipient,
  RecipientValidationStatus
} from 'app/components/recipient-input/recipient-input.component';
import { isNotEmpty } from 'app/util/forms';
import { WarnSendDialogComponent } from 'app/components/warn-send-dialog/warn-send-dialog.component';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { AliasService } from '../alias.service';
import { ExceptionHandlerService } from '../../../shared/services/exceptionhandler.service';

@Component({
  selector: 'app-sell-alias',
  templateUrl: './sell-alias.component.html',
  styleUrls: ['./sell-alias.component.scss']
})
export class SellAliasComponent extends UnsubscribeOnDestroy implements OnInit {
  alias: Alias;
  account: WalletAccount;
  fees: SuggestedFees;

  recipient = new Recipient();

  language: string;
  immutable: boolean;
  messageIsText: boolean;
  encrypt: boolean;
  amount: string;
  fee: string;
  message: string;
  type = TransactionType.Arbitrary;
  subtype = TransactionArbitrarySubtype.AliasSale;

  pin: string;

  private balances: AccountBalances;
  attachMessage: boolean;
  isPrivateOffer = false;
  isSending: boolean;


  constructor(
    private warnDialog: MatDialog,
    private aliasService: AliasService,
    private notifierService: NotifierService,
    private errorService: ExceptionHandlerService,
    private i18nService: I18nService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.account = this.route.snapshot.data.account as WalletAccount;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;
    this.alias = this.route.snapshot.data.alias as Alias;
    this.balances = getBalancesFromAccount(this.account);
    this.immutable = false;
    this.messageIsText = true;
    this.encrypt = false;
    this.storeService.settings
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(async ({ language }) => {
          this.language = language;
        }
      );
  }

  onSubmit(event): void {
    event.stopImmediatePropagation();
    if (this.isPrivateOffer && this.recipient.status !== RecipientValidationStatus.VALID) {
      const dialogRef = this.openWarningDialog([this.recipient]);
      dialogRef.afterClosed().subscribe(ok => {
        if (ok) {
          this.setOnSale();
        }
      });
    } else {
      this.setOnSale();
    }
  }

  async setOnSale(): Promise<void> {
    try {
      this.isSending = true;
      await this.aliasService.setAliasOnSale({
        aliasName: this.alias.aliasName,
        amountPlanck: Amount.fromSigna(this.amount).getPlanck(),
        feePlanck: Amount.fromSigna(this.fee).getPlanck(),
        recipientId: this.isPrivateOffer ? this.recipient.addressId : undefined,
        recipientPublicKey: this.isPrivateOffer ? this.recipient.publicKey : undefined,
        keys: this.account.keys,
        pin: this.pin,
        message: this.message,
        shouldEncryptMessage: this.encrypt,
        messageIsText: this.messageIsText
      });
      this.notifierService.notify('success', this.i18nService.getTranslation('success_alias_sell'));
      await this.router.navigate(['/']);
    } catch (e) {
      this.errorService.handle(e);
    } finally {
      this.isSending = false;
    }
  }


  private openWarningDialog(recipients: Array<Recipient>): MatDialogRef<any> {
    return this.warnDialog.open(WarnSendDialogComponent, {
      width: '400px',
      data: recipients
    });
  }

  hasSufficientBalance(): boolean {
    if (!this.balances) {
      return false;
    }
    const available = this.balances.availableBalance.clone();
    return available.greaterOrEqual(Amount.fromSigna(this.fee));
  }

  isMessageTooLong(): boolean {
    return this.message && this.message.length > 1000;
  }

  canSubmit(): boolean {
    return (this.isPrivateOffer ? isNotEmpty(this.recipient.addressRaw) : true)
      && isNotEmpty(this.amount)
      && isNotEmpty(this.pin)
      && !this.isMessageTooLong()
      && this.hasSufficientBalance();
  }

  onRecipientChange(recipient: Recipient): void {
    this.recipient = recipient;
  }

  canEncrypt(): boolean {
    return this.recipient.publicKey && this.recipient.publicKey !== constants.smartContractPublicKey;
  }
}
