import { Component } from "@angular/core";
import { AccountStatus, CreateService } from "../../create.service";
import { AccountService } from "../../account.service";

const WhiteSpaceIndicator = '⦾';

@Component({
  selector: 'app-account-create-existing',
  styleUrls: ['./existing.component.scss'],
  templateUrl: './existing.component.html'
})
export class AccountCreateExistingComponent {

  passphrase = '';
  showWhitespaces = true;

  constructor(
    public createService: CreateService,
    public accountService: AccountService
  ) {
  }


  public async next(): Promise<void> {
    const phrase = this.showWhitespaces ? this.passphrase.replace(new RegExp(WhiteSpaceIndicator, 'gi'), ' ') : this.passphrase;
    try{
      const {account} = await this.createService.generateAccount(phrase);
      await this.accountService.getAccount(account);
      this.createService.setAccountStatus(AccountStatus.IsVerified);
    }catch(e){
      this.createService.setAccountStatus(AccountStatus.IsNotVerified);
    } finally {
      this.createService.nextStep();
    }
  }

  public onChange(phrase: string): void {
    this.passphrase = this.showWhitespaces
      ? phrase.replace(/ /ig, WhiteSpaceIndicator)
      : phrase.replace(new RegExp(WhiteSpaceIndicator, 'gi'), ' ');
  }

  public onCheckboxChange(checked: boolean): void {
    this.showWhitespaces = checked;
    this.onChange(this.passphrase);
  }
}
