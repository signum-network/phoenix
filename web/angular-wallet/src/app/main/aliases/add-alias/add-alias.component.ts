import {Component, OnInit} from '@angular/core';
import { SuggestedFees } from '@signumjs/core';
import {ActivatedRoute} from '@angular/router';
import { WalletAccount } from 'app/util/WalletAccount';
import { AddAliasWizardService } from './add-alias-wizard.service';

@Component({
  selector: 'app-add-alias',
  templateUrl: './add-alias.component.html',
  styleUrls: ['./add-alias.component.scss']
})
export class AddAliasComponent implements OnInit {

  account: WalletAccount;
  fees: SuggestedFees;

  constructor(private route: ActivatedRoute,
              public  wizardService: AddAliasWizardService,
              ) {
  }

  ngOnInit(): void {
    this.account = this.route.snapshot.data.account as WalletAccount;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;
  }
}
