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
import { SendMoneyService } from '../send-money.service';

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
  selector: 'app-send-money-form',
  templateUrl: './send-money-form.component.html',
  styleUrls: ['./send-money-form.component.scss']
})
export class SendMoneyFormComponent extends UnsubscribeOnDestroy implements OnInit, AfterViewInit {
  @ViewChild('sendMoneyForm', { static: true }) public sendMoneyForm: NgForm;
  @ViewChild('amount', { static: true }) public amount: string;
  @ViewChild('message', { static: true }) public message: string;
  @ViewChild('fullHash', { static: false }) public fullHash: string;
  @ViewChild('encrypt', { static: true }) public encrypt: boolean;
  @ViewChild('pin', { static: true }) public pin: string;
  @ViewChild('messageIsText', { static: true }) public messageIsText: boolean;
  @ViewChild('fee', { static: true }) public fee: string;
  @ViewChild('maxAmount', { static: true }) public maxAmount: string;

  @Input() account: WalletAccount;
  @Input() fees: SuggestedFees;

  showMessage = false;
  deadline = '24';
  immutable = false;

  public recipient = new Recipient();
  isSending = false;
  language: string;

  private balances: AccountBalances;
  symbol = CurrencySymbol;
  type = TransactionType.Payment;
  subtype = TransactionPaymentSubtype.Ordinary;

  constructor(
    private warnDialog: MatDialog,
    private sendMoneyService: SendMoneyService,
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
        this.applyDeepLinkParams(this.route.snapshot.queryParams);
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
      setTimeout(() => {
        this.applyDeepLinkParams(this.route.snapshot.queryParams);
      }, 250);
    }
  }

  private applyDeepLinkParams(queryParams: Params): void {
    try {
      if (queryParams.cip22) {
        this.applyCIP22DeepLinkParams(queryParams);
      } else {
        this.applyLegacyDeepLinkParams(queryParams);
      }
    } catch (e) {
      this.notifierService.notify('warning', 'Invalid Deeplink parameters. Ignored');
    }
  }

  private applyCIP22DeepLinkParams(queryParams: Params): void {
    const { payload } = queryParams;
    const decodedPayload = convertBase64StringToString(payload);
    const {
      amountPlanck,
      deadline,
      encrypt,
      feePlanck,
      immutable,
      message,
      messageIsText,
      recipient
    } = JSON.parse(decodedPayload) as CIP22Payload;

    this.onRecipientChange(new Recipient(recipient));

    this.amount = amountPlanck ? Amount.fromPlanck(amountPlanck).getSigna() : this.amount;
    this.fee = feePlanck ? Amount.fromPlanck(feePlanck).getSigna() : this.fee;
    this.message = message;
    this.messageIsText = asBool(messageIsText, this.messageIsText);
    this.immutable = asBool(immutable, this.immutable);
    this.encrypt = asBool(encrypt, this.encrypt);
    this.deadline = typeof deadline === 'number' && deadline > 0 ? '' + deadline : deadline as string;

    this.showMessage = !!message;
  }

  private applyLegacyDeepLinkParams(queryParams: Params): void {
    const { receiver, feeNQT, amountNQT, message, encrypt, immutable, messageIsText, feeSuggestionType } = queryParams;
    this.onRecipientChange(new Recipient(receiver));
    if (feeNQT) {
      this.fee = Amount.fromPlanck(feeNQT).getSigna();
    }

    if (amountNQT) {
      this.amount = Amount.fromPlanck(amountNQT).getSigna();
    }
    this.message = message;
    this.encrypt = asBool(encrypt, this.encrypt);
    this.immutable = asBool(immutable, this.immutable);
    this.messageIsText = asBool(messageIsText, this.messageIsText);
    if (feeSuggestionType && this.fees[feeSuggestionType]) {
      this.fee = Amount.fromPlanck(this.fees[feeSuggestionType]).getSigna();
    }
    this.showMessage = !!this.message;
  }

  getTotal(): Amount {
    return this.amount !== undefined && this.fee !== undefined
      ? Amount.fromSigna(this.amount).add(Amount.fromSigna(this.fee))
      : Amount.Zero();
  }

  onSubmit(event): void {
    event.stopImmediatePropagation();

    if (this.recipient.status !== RecipientValidationStatus.VALID) {
      const dialogRef = this.openWarningDialog([this.recipient]);
      dialogRef.afterClosed().subscribe(ok => {
        if (ok) {
          this.sendSigna(this.recipient.addressId, this.recipient.publicKey);
        }
      });
    } else {
      this.sendSigna(this.recipient.addressId, this.recipient.publicKey);
    }
  }

  async sendSigna(recipientId: string, recipientPublicKey = ''): Promise<void> {
    try {
      this.isSending = true;

      await this.sendMoneyService.sendAmount({
        amount: Amount.fromSigna(this.amount).getPlanck(),
        fee: Amount.fromSigna(this.fee).getPlanck(),
        recipientId: recipientId,
        recipientPublicKey,
        keys: this.account.keys,
        pin: this.pin,
        message: this.message,
        shouldEncryptMessage: this.encrypt,
        messageIsText: this.messageIsText,
        deadline: 1440
      });
      this.notifierService.notify('success', this.i18nService.getTranslation('success_send_money'));
      this.sendMoneyForm.resetForm();
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
      .subtract(this.getTotal())
      .greaterOrEqual(Amount.Zero());
  }

  isMessageTooLong(): boolean {
    return this.message && this.message.length > 1000;
  }

  canSubmit(): boolean {
    return this.recipient.publicKeyValid
      && isNotEmpty(this.amount)
      && isNotEmpty(this.pin)
      && !this.isMessageTooLong()
      && this.hasSufficientBalance();
  }

  onRecipientChange(recipient: Recipient): void {
    this.recipient = recipient;
  }

  onQRUpload(qrData: QRData): void {
    this.amount = Amount.fromPlanck(qrData.amountNQT).getSigna();
    this.fee = Amount.fromPlanck(qrData.feeNQT).getSigna();
    this.immutable = qrData.immutable;
    this.encrypt = qrData.encrypt;
    this.message = qrData.message;
    this.messageIsText = qrData.messageIsText;
    if (qrData.feeSuggestionType && this.fees[qrData.feeSuggestionType]) {
      this.fee = Amount.fromPlanck(this.fees[qrData.feeSuggestionType]).getSigna();
    }
  }

  onSpendAll(): void {
    if (!this.balances) {
      return;
    }

    const available = this.balances.availableBalance.clone();
    const fee = Amount.fromSigna(this.fee || '0');
    this.amount = available.subtract(fee).getSigna();
  }

  onAmountChange(): void {
    if (!this.balances || !this.fee) {
      return;
    }

    setTimeout(() => {
      const available = this.balances.availableBalance.clone();
      const fee = Amount.fromSigna(this.fee);
      this.maxAmount = available.subtract(fee).getSigna();
    });
  }

  canEncrypt(): boolean {
    return this.recipient.publicKey && this.recipient.publicKey !== constants.smartContractPublicKey;
  }


  onPublickeyChange(publicKey: string): void {
    this.recipient.publicKey = publicKey;
  }
}
