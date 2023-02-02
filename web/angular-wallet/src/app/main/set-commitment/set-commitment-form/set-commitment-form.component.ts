import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SuggestedFees, TransactionMiningSubtype, TransactionType } from '@signumjs/core';
import { Amount } from '@signumjs/util';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { I18nService } from 'app/shared/services/i18n.service';
import { StoreService } from '../../../store/store.service';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from '../../../util/UnsubscribeOnDestroy';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountBalances, getBalancesFromAccount } from '../../../util/balance';
import { AccountService } from '../../../setup/account/account.service';
import { NetworkService } from '../../../network/network.service';
import { isKeyDecryptionError } from '../../../util/exceptions/isKeyDecryptionError';
import { AmountInputComponent } from '../../../components/amount-input/amount-input.component';
import { WalletAccount } from 'app/util/WalletAccount';

const isNotEmpty = (value: string) => value && value.length > 0;

const CommitmentMode = {
  Add: 'add',
  Revoke: 'revoke'
};

@Component({
  selector: 'app-set-commitment-form',
  templateUrl: './set-commitment-form.component.html',
  styleUrls: ['./set-commitment-form.component.scss']
})
export class SetCommitmentFormComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild('sendForm', { static: true }) public sendForm: NgForm;
  @ViewChild('amount', { static: true }) public amount: string;
  @ViewChild('message', { static: true }) public message: string;
  @ViewChild(AmountInputComponent, { static: true }) public amountInput: AmountInputComponent;

  @Input() account: WalletAccount;
  @Input() fees: SuggestedFees;

  symbol = Amount.CurrencySymbol();
  fee: string;
  isSending = false;
  blocksMissingUntilRevoke = 0;
  language: string;
  pin: string;
  mode: string;


  private balances: AccountBalances;
  type = TransactionType.Mining;
  maxAmount = '0';

  constructor(
    private accountService: AccountService,
    private networkService: NetworkService,
    private notifierService: NotifierService,
    private i18nService: I18nService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
    this.storeService.settingsUpdated$
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(async ({ language }) => {
          this.language = language;
        }
      );
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.fee = Amount.fromPlanck(this.fees.standard.toString(10)).getSigna();
      this.balances = getBalancesFromAccount(this.account);
    }, 0);
    this.checkForCommitmentRemoval();
    this.mode = CommitmentMode.Add;
  }

  private async checkForCommitmentRemoval(): Promise<void> {

    const [
      { blocks },
      { transactions },
      { numberOfBlocks }
    ] = await Promise.all([
      this.accountService.getForgedBlocks(this.account),
      this.accountService.getAddedCommitments(this.account),
      this.networkService.getBlockchainStatus()
    ]);

    /**
     * Rules for being eligible for revocation
     * rule 1: at least 1440 blocks since last add commitment
     * rule 2: at least 1440 blocks since last minted block
     */
    const blocksMissingSinceLastAddedCommitment = transactions.length ? numberOfBlocks - transactions[0].height : 1440;
    const blocksMissingSinceLastMintedBlock = blocks.length ? numberOfBlocks - blocks[0].height : 1440;

    this.blocksMissingUntilRevoke = Math.max(
      1440 - blocksMissingSinceLastAddedCommitment,
      1440 - blocksMissingSinceLastMintedBlock);
  }

  getTotal(): Amount {
    if (this.isRevoking()) {
      return Amount.fromSigna(this.fee);
    }

    return this.amount !== undefined && this.fee !== undefined
      ? Amount.fromSigna(this.amount).add(Amount.fromSigna(this.fee))
      : Amount.fromSigna(this.fee);
  }

  async onSubmit(): Promise<void> {
    try {
      this.isSending = true;
      await this.accountService.setCommitment({
        isRevoking: this.isRevoking(),
        amountPlanck: Amount.fromSigna(this.amount).getPlanck(),
        feePlanck: Amount.fromSigna(this.fee).getPlanck(),
        keys: this.account.keys,
        pin: this.pin
      });
      this.notifierService.notify('success', this.i18nService.getTranslation('success_set_commitment'));
      this.sendForm.resetForm();
      await this.router.navigate(['/']);
    } catch (e) {
      if (isKeyDecryptionError(e)) {
        this.notifierService.notify('error', this.i18nService.getTranslation('wrong_pin'));
      } else {
        this.notifierService.notify('error', this.i18nService.getTranslation('error_set_commitment'));
      }
    } finally {
      this.isSending = false;
    }
  }

  hasSufficientBalance(): boolean {
    if (!this.balances) {
      return false;
    }

    if (this.isRevoking()) {
      const fee = Amount.fromSigna(this.fee || '0');
      const hasBalanceToPayFee = this.balances.availableBalance.clone()
        .greaterOrEqual(fee);

      const revokableCommitment = this.balances.committedBalance.clone();

      return hasBalanceToPayFee &&
        revokableCommitment.greaterOrEqual(Amount.fromSigna(this.amount || '0'));
    }

    return this.balances.availableBalance.clone()
      .greaterOrEqual(this.getTotal());
  }

  canSubmit(): boolean {
    return isNotEmpty(this.amount) &&
      isNotEmpty(this.pin) &&
      this.hasSufficientBalance();
  }

  hasMissingBlocks(): boolean {
    return this.blocksMissingUntilRevoke > 0;
  }

  isRevoking(): boolean {
    return this.mode === CommitmentMode.Revoke;
  }

  setPin(pin: string): void {
    this.pin = pin;
  }

  hasNothingCommitted(): boolean {
    return this.balances.committedBalance.equals(Amount.Zero());
  }

  getSubtype(): number {
    return this.isRevoking() ? TransactionMiningSubtype.RemoveCommitment : TransactionMiningSubtype.AddCommitment;
  }

  onAmountChange(): void {

    if (!this.balances) {
      return;
    }

    setTimeout(() => {
      const fee = Amount.fromSigna(this.fee);
      this.maxAmount = this.isRevoking()
        ? this.balances.committedBalance.clone().getSigna()
        : this.balances.availableBalance.clone().subtract(fee).getSigna();
    });
  }

  onModeChange(): void {
    this.onAmountChange();
    if (this.amount) {
      this.amount = undefined;
    }
  }
}
