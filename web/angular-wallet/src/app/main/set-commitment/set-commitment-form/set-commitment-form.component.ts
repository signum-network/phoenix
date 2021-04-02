import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Account, SuggestedFees} from '@burstjs/core';
import {
  BurstValue
} from '@burstjs/util';
import {NgForm} from '@angular/forms';
import {TransactionService} from 'app/main/transactions/transaction.service';
import {NotifierService} from 'angular-notifier';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {StoreService} from '../../../store/store.service';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {ActivatedRoute, Router} from '@angular/router';
import {getBalancesFromAccount, AccountBalances} from '../../../util/balance';
import {AccountService} from '../../../setup/account/account.service';
import {NetworkService} from '../../../network/network.service';

const isNotEmpty = (value: string) => value && value.length > 0;

@Component({
  selector: 'app-set-commitment-form',
  templateUrl: './set-commitment-form.component.html',
  styleUrls: ['./set-commitment-form.component.scss']
})
export class SetCommitmentFormComponent extends UnsubscribeOnDestroy implements OnInit, AfterViewInit {
  @ViewChild('sendForm', {static: true}) public sendForm: NgForm;
  @ViewChild('amount', {static: true}) public amount: string;
  @ViewChild('message', {static: true}) public message: string;
  @ViewChild('pin', {static: true}) public pin: string;

  @Input() account: Account;
  @Input() fees: SuggestedFees;

  public fee: string;
  public isRevoking: boolean;
  isSending = false;
  blocksMissingUntilRevoke = 0;
  language: string;

  private balances: AccountBalances;

  constructor(
    private accountService: AccountService,
    private networkService: NetworkService,
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
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.fee = BurstValue.fromPlanck(this.fees.standard.toString(10)).getBurst();
      this.balances = getBalancesFromAccount(this.account);
    }, 0);
  }

  ngAfterViewInit(): void {

  }

  private async checkForCommitmentRemoval(): Promise<void> {

    const [
      {blocks},
      {transactions},
      {numberOfBlocks}
    ] = await Promise.all([
      this.accountService.getMintedBlocks(this.account),
      this.accountService.getAddedCommitments(this.account),
      this.networkService.getBlockchainStatus()
    ]);

    /**
     * Rules for being eligible for revocation
     * rule 1: at least 60 blocks since last add commitment
     * rule 2: at least 1440 blocks since last minted block
     */
    const blocksMissingSinceLastAddedCommitment = transactions.length ? numberOfBlocks - transactions[0].height : 60;
    const blocksMissingSinceLastMintedBlock = blocks.length ? numberOfBlocks - blocks[0].height : 1440;

    this.blocksMissingUntilRevoke = Math.max(
      60 - blocksMissingSinceLastAddedCommitment,
      1440 - blocksMissingSinceLastMintedBlock);
  }

  getTotal(): BurstValue {
    return this.amount !== undefined && this.fee !== undefined
      ? BurstValue.fromBurst(this.amount).add(BurstValue.fromBurst(this.fee))
      : BurstValue.Zero();
  }

  async onSubmit(): Promise<void> {
    try {
      this.isSending = true;
      await this.accountService.setCommitment({
        isRevoking: this.isRevoking,
        amountPlanck: BurstValue.fromBurst(this.amount).getPlanck(),
        feePlanck: BurstValue.fromBurst(this.fee).getPlanck(),
        keys: this.account.keys,
        pin: this.pin,
      });
      this.notifierService.notify('success', this.i18nService.getTranslation('success_set_commitment'));
      this.sendForm.resetForm();
      await this.router.navigate(['/']);
    } catch (e) {
      this.notifierService.notify('error', this.i18nService.getTranslation('error_set_commitment'));
    } finally {
      this.isSending = false;
    }
  }

  hasSufficientBalance(): boolean {
    if (!this.balances) {
      return false;
    }

    if (this.isRevoking) {
      const fee = BurstValue.fromBurst(this.fee || '0');
      const hasBalanceToPayFee = this.balances.availableBalance.clone()
        .greaterOrEqual(fee);

      const revokableCommitment = this.balances.committedBalance.clone();

      return hasBalanceToPayFee &&
        revokableCommitment.greaterOrEqual(BurstValue.fromBurst(this.amount || '0'));
    }

    return this.balances.availableBalance.clone()
      .greaterOrEqual(this.getTotal());
  }

  canSubmit(): boolean {
    return isNotEmpty(this.amount) &&
      isNotEmpty(this.pin) &&
      this.hasSufficientBalance();
  }

  onSpendAll(): void {
    if (!this.balances) {
      return;
    }

    const fee = BurstValue.fromBurst(this.fee || '0');

    this.amount = this.isRevoking
      ? this.balances.committedBalance.clone().getBurst()
      : this.balances.availableBalance.clone().subtract(fee).getBurst();
  }

  canRevoke(): boolean {
    return this.blocksMissingUntilRevoke === 0;
  }
}
