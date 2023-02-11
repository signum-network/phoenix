import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'app/store/store.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { TokenData, TokenService } from 'app/shared/services/token.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { interval } from "rxjs";
import { UnsubscribeOnDestroy } from "app/util/UnsubscribeOnDestroy";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-tokens',
  styleUrls: ['./tokens.component.scss'],
  templateUrl: './tokens.component.html'
})
export class TokensComponent extends UnsubscribeOnDestroy implements OnInit, OnDestroy {
  public selectedAccount: WalletAccount;
  public tokens: TokenData[] = [];

  intervalHandle = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private progressService: FuseProgressBarService,
    private tokenService: TokenService
  ) {
    super();
  }

  ngOnInit(): void {
    this.selectedAccount = this.route.snapshot.data.account as WalletAccount;
    if (this.selectedAccount) {
      this.progressService.show();
      this.isLoading = true;
      this.fetchTokens().finally(() => {
        this.isLoading = false;
        this.progressService.hide();
      });
    }
    interval(120_000)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => this.fetchTokens());
  }


  async fetchTokens(): Promise<void> {
    this.tokens = await this.tokenService.fetchAccountTokens(this.selectedAccount);
  }

}
