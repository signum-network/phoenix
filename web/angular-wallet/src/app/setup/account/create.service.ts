import {Injectable} from '@angular/core';
import {AccountService} from './account.service';
import {Account, Address, AddressPrefix} from '@signumjs/core';
import {generateMasterKeys, Keys, PassPhraseGenerator} from '@signumjs/crypto';
import {NetworkService} from '../../network/network.service';

export enum StepsEnum {
  Start,
  Salt,
  Record,
  DefinePin,
  ActivateAccount,
}


@Injectable()
export class CreateService {
  private words: string[] = [];
  private salt: string;
  private seed: any[];
  private account: Account;
  private pin: string;
  private step: number;

  constructor(
    private accountService: AccountService,
    private networkService: NetworkService,
  ) {
    this.step = StepsEnum.Start;
    this.reset();
  }

  public getAccount(): Account {
    return this.account;
  }

  public getWords(): string[] {
    return this.words;
  }

  public setPin(pin: string): void {
    this.pin = pin;
  }

  public getPin(): string {
    return this.pin;
  }

  public setSeed(seed: any[]): void {
    this.seed = seed;
  }

  public getSeed(): any[] {
    return this.seed;
  }

  public setSalt(salt: string): void {
    this.salt = salt;
  }

  public getSalt(): string {
    return this.salt;
  }

  public getWordsPart(index: number): string {
    return this.words[index];
  }

  public getCompletePassphrase(): string {
    return this.words.concat(this.salt).join(' ');
  }

  // public setId(account: string): void {
  //   this.account = account;
  // }
  //
  // public getId(): string {
  //   return this.account;
  // }

  // public setAddress(address: string): void {
  //   this.accountRS = address;
  // }
  //
  // public getAddress(): string {
  //   return this.accountRS;
  // }

  public previousStep(): void {
    this.step = Math.max(0, this.step - 1);
  }

  public setStep(step: StepsEnum): void {
    this.step = step;
  }

  public getStep(): StepsEnum {
    return this.step;
  }

  public isSeedGenerated(): boolean {
    return this.seed && this.seed.length > 0;
  }

  public isAccountGenerated(): boolean {
    return this.account !== undefined;
    // return this.words.length > 0 &&
    //   this.accountRS !== undefined &&
    //   this.account !== undefined;
  }

  public createActiveAccount(): Promise<Account> {
    return this.accountService.createActiveAccount({passphrase: this.getCompletePassphrase(), pin: this.pin});
  }

  public createPassiveAccount(): Promise<Account> {
    return this.accountService.createOfflineAccount(this.account.accountRS);
  }

  public reset(): void {
    this.words = [];
    this.seed = undefined;
    this.salt = undefined;
    // this.account = undefined;
    // this.accountRS = undefined;
    this.account = undefined;
    setTimeout(x => {
      this.step = StepsEnum.Start;
    }, 0);
  }

  async generateAccount(): Promise<Account> {
    const passphraseGenerator = new PassPhraseGenerator();
    this.words = await passphraseGenerator.generatePassPhrase(this.seed);
    const completePhrase = this.getCompletePassphrase();
    const keys = generateMasterKeys(completePhrase);
    const address = Address.fromPublicKey(keys.publicKey, this.networkService.isMainNet() ? AddressPrefix.MainNet : AddressPrefix.TestNet);
    this.account = new Account();
    this.account.keys = keys;
    this.account.accountRS = address.getReedSolomonAddress();
    this.account.account = address.getNumericId();
    return this.account;
  }
}
