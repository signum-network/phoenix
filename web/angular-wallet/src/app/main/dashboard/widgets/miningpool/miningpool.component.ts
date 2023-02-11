import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TransactionMiningSubtype, TransactionType } from '@signumjs/core';
import { AccountService } from 'app/setup/account/account.service';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { ChainTime } from '@signumjs/util';
import { WalletAccount } from 'app/util/WalletAccount';

@Component({
  selector: 'app-miningpool',
  templateUrl: './miningpool.component.html',
  styleUrls: ['./miningpool.component.scss', '../widget.shared.scss']
})
export class MiningpoolComponent extends UnsubscribeOnDestroy implements OnInit, OnChanges {

  @Input() public account: WalletAccount;

  locale = 'en';
  isLoading = true;
  poolAccount: WalletAccount;
  lastPoolAssignment: Date;
  poolName: string;

  constructor(
    private accountService: AccountService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.fetchPoolAccount();
    this.isLoading = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.account && changes.account.previousValue !== changes.account.currentValue) {
      this.fetchPoolAccount();
    }
  }

  private async fetchPoolAccount(): Promise<void> {
    try {
      const rewardRecipient = await this.accountService.getRewardRecipient(this.account.account);
      this.poolAccount = rewardRecipient.account !== this.account.account ? rewardRecipient : null;
      if (this.poolAccount) {
        this.poolName = this.getPoolUrlOrName();
        const assignments = await this.accountService.getAccountTransactions({
          accountId: this.account.account,
          type: TransactionType.Mining,
          subtype: TransactionMiningSubtype.RewardRecipientAssignment
        });
        this.lastPoolAssignment = ChainTime.fromChainTimestamp(assignments.transactions[0].timestamp).getDate();
      }
    } catch (e) {
      console.warn('MiningPool Component', e.message);
    }
  }


  public getPoolUrlOrName(): string {
    try {
      const poolUrl = this.poolAccount.name.startsWith('http')
        ? this.poolAccount.name
        : 'https://' + this.poolAccount.name;
      // tslint:disable-next-line:no-unused-expression
      new URL(poolUrl);
      return poolUrl;
    } catch (e) {
      return this.poolAccount.name;
    }
  }
}
