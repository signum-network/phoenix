import {Injectable} from '@angular/core';
import {Address, AddressPrefix} from '@signumjs/core';
import { encryptAES, generateMasterKeys, hashSHA256, PassPhraseGenerator } from '@signumjs/crypto';
import {NetworkService} from '../../network/network.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { AccountManagementService } from 'app/shared/services/account-management.service';

export enum AccountStatus {
  New,
  IsVerified,
  IsNotVerified
}


@Injectable()
export class CreateService {
  private phrase: string;
  private salt: string;
  private seed: any[];
  private account: WalletAccount;
  private pin: string;
  private step = 0;
  private accountStatus = AccountStatus.New;
  constructor(
    // private accountService: AccountService,
    private accountManagementService: AccountManagementService,
    private networkService: NetworkService,
  ) {
  }

  public getAccount(): WalletAccount {
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

  public createActiveAccount(): Promise<WalletAccount> {
    const account = new WalletAccount();
    account.type = 'active';
    const keys = generateMasterKeys(this.phrase);
    // TODO: improve key stretching....
    const maskedPin = hashSHA256(this.pin);
    const encryptedKey = encryptAES(keys.signPrivateKey, maskedPin);
    const encryptedSignKey = encryptAES(keys.agreementPrivateKey, maskedPin);

    account.keys = {
      publicKey: keys.publicKey,
      signPrivateKey: encryptedKey,
      agreementPrivateKey: encryptedSignKey
    };

    const address = Address.fromPublicKey(keys.publicKey, this.networkService.getAddressPrefix());
    account.account = address.getNumericId();
    account.accountRS = address.getReedSolomonAddress();
    account.networkName = this.networkService.getNetworkName();

    return this.accountManagementService.addAccount(account);
  }

  public async createWatchOnlyAccount(reedSolomonAddress: string): Promise<WalletAccount> {
    const account = new WalletAccount();
    const address = Address.fromReedSolomonAddress(reedSolomonAddress);
    account.type = 'offline';
    account.accountRS = address.getReedSolomonAddress();
    account.account = address.getNumericId();
    account.networkName = this.networkService.getNetworkName();
    await  this.accountManagementService.addAccount(account);
    return account;
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

  async generateAccount(passphrase?: string): Promise<WalletAccount> {
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
    this.account = new WalletAccount();
    this.account.keys = keys;
    this.account.accountRS = address.getReedSolomonAddress();
    this.account.account = address.getNumericId();
    return this.account;
  }

  public setAccountStatus(accountStatus: AccountStatus): void {
    this.accountStatus = accountStatus;
  }

  public getAccountStatus(): AccountStatus {
    return this.accountStatus;
  }

}
