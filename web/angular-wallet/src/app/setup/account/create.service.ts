import {Injectable} from '@angular/core';
import {AccountService} from './account.service';
import {Account} from '@burstjs/core';

export enum StepsEnum {
  Start,
  Record,
  DefinePin,
  ActivateAccount,
}


@Injectable()
export class CreateService {
  private passphrase: string[];
  private pin: string;
  private account: string;
  private accountRS: string;
  private step: number;

  constructor(private accountService: AccountService) {
    this.step = StepsEnum.Start;
    this.reset();
  }

  public setPassphrase(passphrase: string[]): void {
    this.passphrase = passphrase;
  }

  public getPassphrase(): string[] {
    return this.passphrase;
  }

  public setPin(pin: string): void {
    this.pin = pin;
  }

  public getPin(): string {
    return this.pin;
  }

  public getPassphrasePart(index: number): string {
    return this.passphrase[index];
  }

  public getCompletePassphrase(): string {
    return this.passphrase.join(' ');
  }

  public setId(account: string): void {
    this.account = account;
  }

  public getId(): string {
    return this.account;
  }

  public setAddress(address: string): void {
    this.accountRS = address;
  }

  public getAddress(): string {
    return this.accountRS;
  }

  public previousStep() : void {
    this.step = Math.max(0, this.step - 1);
  }

  public setStep(step: StepsEnum): void {
    this.step = step;
  }

  public getStep(): StepsEnum {
    return this.step;
  }

  public isPassphraseGenerated(): boolean {
    return this.passphrase.length > 0 &&
      this.accountRS !== undefined &&
      this.account !== undefined;
  }

  public createActiveAccount(): Promise<Account> {
    return this.accountService.createActiveAccount({passphrase: this.getCompletePassphrase(), pin: this.pin});
  }

  public createPassiveAccount(): Promise<Account> {
    return this.accountService.createOfflineAccount(`BURST-${this.accountRS}`);
  }

  public reset(): void {
    this.passphrase = [];
    this.account = undefined;
    this.accountRS = undefined;
    setTimeout(x => {
      this.step = StepsEnum.Start;
    }, 0);

  }
}
