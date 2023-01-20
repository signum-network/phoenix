import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Block } from '@signumjs/core';
import { AccountService } from '../../../../setup/account/account.service';
import { ChainTime } from '@signumjs/util';
import { formatCurrency } from '@angular/common';
import { Settings } from 'app/store/settings';
import { UnsubscribeOnDestroy } from '../../../../util/UnsubscribeOnDestroy';
import { StoreService } from '../../../../store/store.service';
import { takeUntil } from 'rxjs/operators';
import { NetworkService } from '../../../../network/network.service';
import { WalletAccount } from 'app/util/WalletAccount';

interface ForgedBlockInfo {
  count: number;
  minedIncomeSigna: number;
  lastBlock: Block;
}

@Component({
  selector: 'app-blockforged',
  templateUrl: './blockforged.component.html',
  styleUrls: ['./blockforged.component.scss', '../widget.shared.scss']
})
export class BlockforgedComponent extends UnsubscribeOnDestroy implements OnInit, OnChanges {
  @Input() public account: WalletAccount;
  @Input() public priceBtc: number;
  @Input() public priceUsd: number;
  @Input() public priceEur: number;
  @Input() public priceRub: number;

  locale = 'en';
  isLoading = true;
  blockInfo: ForgedBlockInfo;
  // isMainNet = false;
  private interval: NodeJS.Timeout;

  private unsubscribe = takeUntil(this.unsubscribeAll);

  constructor(
    private accountService: AccountService,
    private storeService: StoreService,
    private networkService: NetworkService
  ) {
    super();
    this.blockInfo = {
      count: 0,
      lastBlock: null,
      minedIncomeSigna: 0
    };
  }

  async ngOnInit(): Promise<void> {
    await this.updateForgedBlocks();
    this.isLoading = false;
    this.interval = setInterval(
      () => this.updateForgedBlocks(),
      2 * 60 * 1000);

    // this.networkService.networkInfo$
    //   .pipe(this.unsubscribe)
    //   .subscribe( () => {
    //     this.isMainNet = this.networkService.isMainNet();
    //   });

    this.storeService.settingsUpdated$
      .pipe(this.unsubscribe)
      .subscribe((settings: Settings) => {
        this.locale = settings.language;
      });
  }

  ngOnChanges(): void {
    this.updateForgedBlocks();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    clearInterval(this.interval);
  }


  private async updateForgedBlocks(): Promise<void> {
    const { blocks } = await this.accountService.getForgedBlocks(this.account);
    this.blockInfo = blocks.reduce<ForgedBlockInfo>((acc, b) => {
        if (!(acc.lastBlock && acc.lastBlock.timestamp >= b.timestamp)) {
          acc.lastBlock = b;
        }
        acc.minedIncomeSigna += parseInt(b.blockReward, 10);
        acc.count++;
        return acc;
      },
      {
        minedIncomeSigna: 0,
        lastBlock: null,
        count: 0
      });
  }

  getLastBlockDate(): Date | null {
    return this.blockInfo.count > 0
      ? ChainTime.fromChainTimestamp(this.blockInfo.lastBlock.timestamp).getDate()
      : null;
  }

  private asCurrency(value: number, currency: string, digitsInfo: string = '1.2-2'): string {
    return `${formatCurrency(value, this.locale, currency, '', digitsInfo)}`;
  }

  public getPriceBtc = (): string => {
    return `฿${this.asCurrency(this.priceBtc * this.blockInfo.minedIncomeSigna, '', '1.0-4')}`;
  }
  public getPriceUsd = (): string => `$${this.asCurrency(this.priceUsd * this.blockInfo.minedIncomeSigna, '', '1.0-2')}`;
  public getPriceEur = (): string => `€${this.asCurrency(this.priceEur * this.blockInfo.minedIncomeSigna, '', '1.0-2')}`;
  public getPriceRub = (): string => `₽${this.asCurrency(this.priceRub * this.blockInfo.minedIncomeSigna, '', '1.0-2')}`;

  getExplorerLink(): string {
    return`${this.networkService.getChainExplorerHost()}/blocks/?m=${this.account.account}`;
  }
}
