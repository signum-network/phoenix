import {Component, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Account, SuggestedFees} from '@burstjs/core';
import {
  convertAddressToNumericId,
  convertNQTStringToNumber,
  BurstValue,
  parseDeeplink
} from '@burstjs/util';
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
import {DeeplinkParts} from '@burstjs/util/dist';


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
  immutable: string | boolean = false;

  public recipient = new Recipient();
  public fee: string;
  isSending = false;
  language: string;

  private balances: AccountBalances;

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
      this.fee = BurstValue.fromPlanck(this.fees.standard.toString(10)).getBurst();
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
    if (queryParams.cip22) {
      this.applyCIP22DeepLinkParams(queryParams);
    } else {
      this.applyLegacyDeepLinkParams(queryParams);
    }
  }

  private applyCIP22DeepLinkParams(queryParams: Params): void {
    console.log('applyDeepLinkParams', queryParams);
  }

  private applyLegacyDeepLinkParams(queryParams: Params): void {
    const {receiver, feeNQT, amountNQT, message, encrypt, immutable, messageIsText, feeSuggestionType} = queryParams;
    this.onRecipientChange(new Recipient(receiver));
    if (feeNQT) {
      this.fee = convertNQTStringToNumber(feeNQT).toString();
    }

    if (amountNQT) {
      this.amount = convertNQTStringToNumber(amountNQT).toString();
    }
    this.message = message;
    this.encrypt = encrypt;
    this.immutable = immutable || this.immutable;
    if (this.immutable === 'false') {
      this.immutable = false;
    }
    if (messageIsText === 'false') {
      this.messageIsText = false;
    }
    if (feeSuggestionType && this.fees[feeSuggestionType]) {
      this.fee = convertNQTStringToNumber(this.fees[feeSuggestionType]).toString();
    }
    this.showMessage = !!this.message;
  }

  getTotal(): BurstValue {
    return this.amount !== undefined && this.fee !== undefined
      ? BurstValue.fromBurst(this.amount).add(BurstValue.fromBurst(this.fee))
      : BurstValue.Zero();
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
        amount: BurstValue.fromBurst(this.amount).getPlanck(),
        fee: BurstValue.fromBurst(this.fee).getPlanck(),
        recipientId: convertAddressToNumericId(addressRS),
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
      this.notifierService.notify('error', this.i18nService.getTranslation('error_send_money'));
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
      .greaterOrEqual(BurstValue.Zero());
  }

  canSubmit(): boolean {
    return isNotEmpty(this.recipient.addressRaw) &&
      isNotEmpty(this.amount) &&
      isNotEmpty(this.pin) &&
      this.hasSufficientBalance();
  }

  onRecipientChange(recipient: Recipient): void {
    this.recipient = recipient;
  }

  onQRUpload(qrData: QRData): void {
    // TODO: remove deprecated convertNQTStringToNumber and migrate to BurstValue
    this.amount = convertNQTStringToNumber(qrData.amountNQT).toString();
    this.fee = convertNQTStringToNumber(qrData.feeNQT).toString();
    this.immutable = qrData.immutable;
    this.encrypt = qrData.encrypt;
    this.message = qrData.message;
    this.messageIsText = qrData.messageIsText;
    if (qrData.feeSuggestionType && this.fees[qrData.feeSuggestionType]) {
      this.fee = convertNQTStringToNumber(this.fees[qrData.feeSuggestionType]).toString();
    }
  }

  onSpendAll(): void {
    if (!this.balances) {
      return;
    }

    const available = this.balances.availableBalance.clone();
    const fee = BurstValue.fromBurst(this.fee || '0');
    this.amount = available.subtract(fee).getBurst();
  }
}
