import {Injectable} from '@angular/core';
import { Alias } from '@signumjs/core';
import { AccountService } from '../../../setup/account/account.service';

const MaxSteps = 2

@Injectable()
export class AddAliasService {
  public aliasName = '';
  private step = 0;

  constructor(
    private accountService: AccountService,
  ) {
  }

  public previousStep(): void {
    this.step = Math.max(0, this.step - 1);
  }

  public nextStep(): void {
    this.step = Math.min(MaxSteps - 1, this.step + 1);
  }

  public setStep(step: number): void {
    this.step = step;
  }

  public getStep(): number {
    return this.step;
  }



  public reset(): void {
    this.aliasName = '';
    setTimeout(x => {
      this.step = 0;
    }, 0);
  }

  async fetchAlias(aliasName: string): Promise<Alias|null> {
    try{
      return (await this.accountService.getAlias(aliasName));
    } catch (e){
      return null;
    }
  }

  // async createAlias() {
  //   this.accountService.setAlias({
  //     aliasName: this.aliasName,
  //     aliasURI: this.description,
  //   })
  // }

}
