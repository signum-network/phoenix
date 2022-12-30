import { Component, OnInit } from '@angular/core';
import { SuggestedFees, Alias } from '@signumjs/core';
import {ActivatedRoute} from '@angular/router';
import { WalletAccount } from 'app/util/WalletAccount';

@Component({
  selector: 'app-edit-alias',
  templateUrl: './edit-alias.component.html',
  styleUrls: ['./edit-alias.component.scss']
})
export class EditAliasComponent implements OnInit {

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
