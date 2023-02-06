import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { SuggestedFees, TransactionPaymentSubtype, TransactionType } from '@signumjs/core';
import { Amount, convertBase64StringToString, CurrencySymbol } from '@signumjs/util';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { I18nService } from 'app/shared/services/i18n.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StoreService } from '../../../store/store.service';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from '../../../util/UnsubscribeOnDestroy';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { AccountBalances, getBalancesFromAccount } from '../../../util/balance';
import { isKeyDecryptionError } from '../../../util/exceptions/isKeyDecryptionError';
import {
  QRData,
  Recipient,
  RecipientValidationStatus
} from 'app/components/recipient-input/recipient-input.component';
import { WarnSendDialogComponent } from 'app/components/warn-send-dialog/warn-send-dialog.component';
import { asBool, isNotEmpty } from 'app/util/forms';
import { constants } from '../../../constants';
import { WalletAccount } from 'app/util/WalletAccount';
import { SendMessageService } from '../send-message.service';

interface CIP22Payload {
  amountPlanck: string | number;
  deadline: string | number;
  encrypt: string | boolean;
  feePlanck: string | number;
  immutable: string | boolean;
  message: string;
  messageIsText: string | boolean;
  recipient: string;
}


@Component({
  selector: 'app-send-message-form',
  templateUrl: './send-message-form.component.html',
  styleUrls: ['./send-message-form.component.scss']
})
export class SendMessageFormComponent extends UnsubscribeOnDestroy implements OnInit, AfterViewInit {
  @ViewChild('sendMoneyForm', { static: true }) public sendForm: NgForm;
  @ViewChild('message', { static: true }) public message: string;
  @ViewChild('fullHash', { static: false }) public fullHash: string;
  @ViewChild('encrypt', { static: true }) public encrypt: boolean;
  @ViewChild('pin', { static: true }) public pin: string;
  @ViewChild('messageIsText', { static: true }) public messageIsText: boolean;
  @ViewChild('fee', { static: true }) public fee: string;

  @Input() account: WalletAccount;
  @Input() fees: SuggestedFees;
  immutable = false;

  public recipient = new Recipient();
  isSending = false;
  language: string;

  private balances: AccountBalances;
  type = TransactionType.Payment;
  subtype = TransactionPaymentSubtype.Ordinary;

  constructor(
    private warnDialog: MatDialog,
    private sendMessageService: SendMessageService,
    private notifierService: NotifierService,
    private i18nService: I18nService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
    this.storeService.settingsUpdated$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(async ({ language }) => {
          this.language = language;
        }
      );
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        const params = this.route.snapshot.queryParams;
        if (params && params.receiver){
          this.onRecipientChange(new Recipient(params.receiver));
        }
      }
    });
  }

  ngOnInit(): void {
    this.balances = getBalancesFromAccount(this.account);
    this.immutable = false;
    this.messageIsText = true;
    this.encrypt = false;
  }

  ngAfterViewInit(): void {
    if (this.route.snapshot.queryParams) {
      const params = this.route.snapshot.queryParams;
      if (params && params.receiver){
        setTimeout(() => {
          this.onRecipientChange(new Recipient(params.receiver));
        }, 100);
      }
    }
  }

  onSubmit(event): void {
    event.stopImmediatePropagation();

    if (this.recipient.status !== RecipientValidationStatus.VALID) {
      const dialogRef = this.openWarningDialog([this.recipient]);
      dialogRef.afterClosed().subscribe(ok => {
        if (ok) {
          this.sendMessage(this.recipient.addressId, this.recipient.publicKey);
        }
      });
    } else {
      this.sendMessage(this.recipient.addressId, this.recipient.publicKey);
    }
  }

  async sendMessage(recipientId: string, recipientPublicKey = ''): Promise<void> {
    try {
      this.isSending = true;

      const params  = {
        feePlanck: Amount.fromSigna(this.fee).getPlanck(),
        recipientId: recipientId,
        recipientPublicKey,
        keys: this.account.keys,
        pin: this.pin,
        message: this.message,
        messageIsText: this.messageIsText,
      };
      if (this.encrypt){
        await this.sendMessageService.sendEncryptedMessage(params);
      }else{
        await this.sendMessageService.sendMessage(params);
      }
      this.notifierService.notify('success', this.i18nService.getTranslation('success_send_money'));
      this.sendForm.resetForm();
      await this.router.navigate(['/']);
    } catch (e) {
      if (isKeyDecryptionError(e)) {
        this.notifierService.notify('error', this.i18nService.getTranslation('wrong_pin'));
      } else {
        this.notifierService.notify('error', this.i18nService.getTranslation('error_send_money'));
      }
    } finally {
      this.immutable = false;
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
    return available
      .subtract(Amount.fromSigna(this.fee))
      .greaterOrEqual(Amount.Zero());
  }

  isMessageTooLong(): boolean {
    return this.message && this.message.length > 1000;
  }

  canSubmit(): boolean {
    return this.recipient.publicKeyValid
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


  onPublickeyChange(publicKey: string): void {
    this.recipient.publicKey = publicKey;
  }
}
