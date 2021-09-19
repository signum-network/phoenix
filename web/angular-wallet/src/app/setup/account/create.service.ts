import {Injectable} from '@angular/core';
import {AccountService} from './account.service';
import {Account, Address, AddressPrefix} from '@signumjs/core';
import {generateMasterKeys, PassPhraseGenerator} from '@signumjs/crypto';
import {NetworkService} from '../../network/network.service';


@Injectable()
export class CreateService {
  private phrase: string;
  private salt: string;
  private seed: any[];
  private account: Account;
  private pin: string;
  private step = 0;

  constructor(
    private accountService: AccountService,
    private networkService: NetworkService,
  ) {
  }

  public getAccount(): Account {
    return this.account;
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

  public getPhrase(): string {
    return this.phrase;
  }

  public previousStep(): void {
    this.step = Math.max(0, this.step - 1);
  }

  public nextStep(): void {
    // max steps is not really known...
    this.step += 1;
  }

  public setStep(step: number): void {
    this.step = step;
  }

  public getStep(): number {
    return this.step;
  }

  public isSeedGenerated(): boolean {
    return this.seed && this.seed.length > 0;
  }

  public isAccountGenerated(): boolean {
    return this.account !== undefined;
  }

  public createActiveAccount(): Promise<Account> {
    return this.accountService.createActiveAccount({passphrase: this.getPhrase(), pin: this.pin});
  }

  public createPassiveAccount(address: string): Promise<Account> {
    return this.accountService.createOfflineAccount(address);
  }

  public reset(): void {
    this.phrase = '';
    this.seed = undefined;
    this.salt = undefined;
    this.account = undefined;
    setTimeout(x => {
      this.step = 0;
    }, 0);
  }

  async generateAccount(passphrase?: string): Promise<Account> {
    this.phrase = passphrase;
    if (!passphrase) {
      const passphraseGenerator = new PassPhraseGenerator();
      const wordlist = await passphraseGenerator.generatePassPhrase(this.seed);
      this.phrase = wordlist.concat(this.salt).join(' ');
    }
    else{
      this.phrase = passphrase;
    }
    const keys = generateMasterKeys(this.phrase);
    const address = Address.fromPublicKey(keys.publicKey, this.networkService.isMainNet() ? AddressPrefix.MainNet : AddressPrefix.TestNet);
    this.account = new Account();
    this.account.keys = keys;
    this.account.accountRS = address.getReedSolomonAddress();
    this.account.account = address.getNumericId();
    return this.account;
  }

}
