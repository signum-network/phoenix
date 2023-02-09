import { Keys } from '@signumjs/crypto';
import { AssetBalance, Transaction, UnconfirmedAssetBalance } from '@signumjs/core';

export class WalletAccount{

  public _id: string;
  public networkName: string;
  public account: string;
  public accountRS: string;
  public accountRSExtended: string;
  public assetBalances: AssetBalance[];
  public balanceNQT: string;
  public description: string;
  public effectiveBalanceNQT: string;
  public keys: Keys;
  public name: string;
  public transactions: Transaction[];
  public type: string;
  public unconfirmedAssetBalances: UnconfirmedAssetBalance[];
  public unconfirmedBalanceNQT: string;
  public commitmentNQT: string;
  public committedBalanceNQT: string;
  public confirmed: boolean;

  constructor(data: any = {}) {
    this._id = data._id;
    this.account = data.account || undefined;
    this.accountRS = data.accountRS || undefined;
    this.accountRSExtended = data.accountRSExtended || undefined;
    this.assetBalances = data.assetBalances || undefined;
    this.balanceNQT = data.balanceNQT || 0;
    this.commitmentNQT = data.commitmentNQT || 0;
    this.committedBalanceNQT = data.committedBalanceNQT || 0;
    this.description = data.description || undefined;
    this.effectiveBalanceNQT = data.effectiveBalanceNQT || 0;
    this.keys = {
      publicKey: data.keys ? data.keys.publicKey : data.publicKey,
      signPrivateKey: data.keys ? data.keys.signPrivateKey : undefined,
      agreementPrivateKey: data.keys ? data.keys.agreementPrivateKey : undefined,
    };
    this.name = data.name || undefined;
    if (data.transactions !== undefined && data.transactions.length > 0) {
      this.transactions = data.transactions;
    } else {
      this.transactions = [];
    }
    this.type = data.type || 'offline';
    this.unconfirmedAssetBalances = data.unconfirmedAssetBalances || undefined;
    this.unconfirmedBalanceNQT = data.unconfirmedBalanceNQT || 0;
    this.networkName = data.networkName || undefined;
    this.confirmed = !!this.keys.publicKey && this.transactions.length > 0;
  }

  public isStored(): boolean {
    return !!this._id;
  }

  public isNew(): boolean {
    return this.type !== 'offline' && this.transactions.length === 0;
  }

  public isUnsafe(): boolean {
    return !this.keys.publicKey;
  }
  public isWatchOnly(): boolean {
    return this.type === 'offline';
  }

}
