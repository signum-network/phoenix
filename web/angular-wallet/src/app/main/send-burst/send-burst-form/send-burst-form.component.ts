import {Component, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Account, SuggestedFees} from '@signumjs/core';
import {Amount, convertBase64StringToString} from '@signumjs/util';
import {NgForm} from '@angular/forms';
import {TransactionService} from 'app/main/transactions/transaction.service';
import {NotifierService} from 'angular-notifier';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {WarnSendDialogComponent} from '../warn-send-dialog/warn-send-dialog.component';
import {
  Recipient,
  RecipientValidationStatus
} from '../../../layout/components/burst-recipient-input/burst-recipient-input.component';
import {StoreService} from '../../../store/store.service';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {ActivatedRoute, Router, NavigationEnd, Params} from '@angular/router';
import {getBalancesFromAccount, AccountBalances} from '../../../util/balance';
import {isKeyDecryptionError} from '../../../util/exceptions/isKeyDecryptionError';
import {Address} from '@signumjs/core';
import {SignaSymbol} from '@signumjs/util';

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

interface QRData {
  recipient: Recipient;
  amountNQT: string;
  feeNQT: string;
  immutable: boolean;
  feeSuggestionType: string;
  encrypt: boolean;
  messageIsText: boolean;
  message?: string;
}

const isNotEmpty = (value: string) => value && value.length > 0;
const asBool = (value: any, defaultValue: boolean): boolean => {
  if (value === undefined) {
    return defaultValue;
  }
  return value === 'true' || value === true;
};

@Component({
  selector: 'app-send-burst-form',
  templateUrl: './send-burst-form.component.html',
  styleUrls: ['./send-burst-form.component.scss']
})
export class SendBurstFormComponent extends UnsubscribeOnDestroy implements OnInit, AfterViewInit {
  @ViewChild('sendBurstForm', {static: true}) public sendBurstForm: NgForm;
  @ViewChild('amount', {static: true}) public amount: string;
  @ViewChild('message', {static: true}) public message: string;
  @ViewChild('fullHash', {static: false}) public fullHash: string;
  @ViewChild('encrypt', {static: true}) public encrypt: boolean;
  @ViewChild('pin', {static: true}) public pin: string;
  @ViewChild('messageIsText', {static: true}) public messageIsText: boolean;

  @Input() account: Account;
  @Input() fees: SuggestedFees;

  advanced = false;
  showMessage = false;
  deadline = '24';
  immutable = false;

  public recipient = new Recipient();
  public fee: string;
  isSending = false;
  language: string;

  private balances: AccountBalances;
  symbol = SignaSymbol;

  constructor(
    private warnDialog: MatDialog,
    private transactionService: TransactionService,
    private notifierService: NotifierService,
    private i18nService: I18nService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
    this.storeService.settings
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(async ({language}) => {
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
    setTimeout(() => {
      this.fee = Amount.fromPlanck(this.fees.standard.toString(10)).getSigna();
      this.balances = getBalancesFromAccount(this.account);
    });
  }

  ngAfterViewInit(): void {
    this.messageIsText = true;

    if (this.route.snapshot.queryParams) {
      setTimeout(() => {
        this.applyDeepLinkParams(this.route.snapshot.queryParams);
      }, 500);
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
    const {payload} = queryParams;
    const decodedPayload = convertBase64StringToString(payload);
    const {
      amountPlanck,
      deadline,
      encrypt,
      feePlanck,
      immutable,
      message,
      messageIsText,
      recipient,
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
    const {receiver, feeNQT, amountNQT, message, encrypt, immutable, messageIsText, feeSuggestionType} = queryParams;
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
          this.sendBurst(this.recipient.addressRaw, this.recipient.publicKey);
        }
      });
    } else {
      this.sendBurst(this.recipient.addressRS, this.recipient.publicKey);
    }
  }

  async sendBurst(addressRS: string, recipientPublicKey = ''): Promise<void> {
    try {
      this.isSending = true;

      await this.transactionService.sendBurst({
        amount: Amount.fromSigna(this.amount).getPlanck(),
        fee: Amount.fromSigna(this.fee).getPlanck(),
        recipientId: Address.fromReedSolomonAddress(addressRS).getNumericId(),
        recipientPublicKey,
        keys: this.account.keys,
        pin: this.pin,
        message: this.message,
        shouldEncryptMessage: this.encrypt,
        messageIsText: this.messageIsText,
        deadline: 1440
      });
      this.notifierService.notify('success', this.i18nService.getTranslation('success_send_money'));
      this.sendBurstForm.resetForm();
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
    return isNotEmpty(this.recipient.addressRaw) &&
      isNotEmpty(this.amount) &&
      isNotEmpty(this.pin) &&
      !this.isMessageTooLong() &&
      this.hasSufficientBalance();
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
}
