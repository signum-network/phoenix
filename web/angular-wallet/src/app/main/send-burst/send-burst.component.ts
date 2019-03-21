import { Component, OnInit } from '@angular/core';
import { SuggestedFees, Account } from '@burstjs/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/setup/account/account.service';
import { StoreService } from 'app/store/store.service';

@Component({
  selector: 'app-send-burst',
  templateUrl: './send-burst.component.html',
  styleUrls: ['./send-burst.component.scss']
})
export class SendBurstComponent implements OnInit {
  account: Account;
  fees: SuggestedFees;

  constructor(private route: ActivatedRoute,
    private accountService: AccountService,
    private storeService: StoreService) {
  }

  ngOnInit() {
    this.account = this.route.snapshot.data.account as Account;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;

    this.storeService.ready.subscribe((ready) => {
      if (ready) {
        this.accountService.currentAccount.subscribe((account) => {
          this.account = account;
        });
      }
    });
  }
}
