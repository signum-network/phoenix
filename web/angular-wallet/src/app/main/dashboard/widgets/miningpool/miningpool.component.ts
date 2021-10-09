import { Component, Input, OnInit } from '@angular/core';
import { Account } from '@signumjs/core';
import { takeUntil } from 'rxjs/operators';
import { AccountService } from '../../../../setup/account/account.service';
import { StoreService } from '../../../../store/store.service';
import { Settings } from '../../../../settings';
import { UnsubscribeOnDestroy } from '../../../../util/UnsubscribeOnDestroy';

@Component({
  selector: 'app-miningpool',
  templateUrl: './miningpool.component.html',
  styleUrls: ['./miningpool.component.scss', '../widget.shared.scss']
})
export class MiningpoolComponent extends UnsubscribeOnDestroy implements OnInit {

  @Input() public account: Account;

  locale = 'en';
  isLoading = true;

  private unsubscribe = takeUntil(this.unsubscribeAll);

  constructor(
    private accountService: AccountService,
    private storeService: StoreService,
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    // await this.updateForgedBlocks();
    this.isLoading = false;
    // this.interval = setInterval(
    //   () => this.updateForgedBlocks(),
    //   2 * 60 * 1000);

    this.storeService.settings
      .pipe(this.unsubscribe)
      .subscribe((settings: Settings) => {
        this.locale = settings.language;
      });
  }

  ngOnChanges(): void {
    // this.updateForgedBlocks();
  }

  ngOnDestroy(): void {
    // clearInterval(this.interval);
  }
}
