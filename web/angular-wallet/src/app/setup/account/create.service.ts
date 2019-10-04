import {Injectable} from '@angular/core';
import {AccountService} from './account.service';

@Injectable()
export class CreateService {
  private passphrase: string[];
  private pin: string;
  private account: string;
  private accountRS: string;
  private publicKey: string;
  private stepIndex: number;

  constructor(private accountService: AccountService) {
    this.stepIndex = 0;
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

  public setPublicKey(publicKey: string): void {
    this.publicKey = publicKey;
  }

  public getPublicKey(): string {
    return this.publicKey;
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

  public setStepIndex(index: number): void {
    this.stepIndex = index;
  }

  public getStepIndex(): number {
    return this.stepIndex;
  }

  public isPassphraseGenerated(): boolean {
    return this.passphrase.length > 0 &&
      this.accountRS !== undefined &&
      this.account !== undefined;
  }

  public createActiveAccount(): Promise<Account> {
    // @ts-ignore
    return this.accountService.createActiveAccount({passphrase: this.getCompletePassphrase(), pin: this.pin});
  }

  public createPassiveAccount(): Promise<Account> {
    // @ts-ignore
    return this.accountService.createOfflineAccount(`BURST-${this.accountRS}`);
  }

  public reset(): void {
    this.passphrase = [];
    this.account = undefined;
    this.accountRS = undefined;
  }
}
