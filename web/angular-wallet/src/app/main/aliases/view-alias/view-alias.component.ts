import { Component, OnInit } from '@angular/core';
import { SuggestedFees, Alias } from '@signumjs/core';
import {ActivatedRoute} from '@angular/router';
import { WalletAccount } from 'app/util/WalletAccount';

@Component({
  selector: 'app-view-alias',
  templateUrl: './view-alias.component.html',
  styleUrls: ['./view-alias.component.scss']
})
export class ViewAliasComponent implements OnInit {
  alias: Alias;
  account: WalletAccount;
  fees: SuggestedFees;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.account = this.route.snapshot.data.account as WalletAccount;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;
    this.alias = this.route.snapshot.data.alias as Alias;
  }

}
