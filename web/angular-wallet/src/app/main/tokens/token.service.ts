import {Injectable} from '@angular/core';
import {ApiService} from '../../api.service';
import {Account, Asset} from '@signumjs/core';
import {decryptAES, hashSHA256, Keys} from '@signumjs/crypto';
import {KeyDecryptionException} from '../../util/exceptions/KeyDecryptionException';
import {Amount} from '@signumjs/util';

export interface TokenData {
  id: string;
  name: string;
  description: string;
  balance: number;
  decimals: number;
  supply: number;
  priceInfo: PriceInfo;
  total: number;
}

export interface PriceInfo {
  amount: string;
  change: number;
}

interface TransferTokenRequest {
  deadline?: number;
  fee: string;
  keys: Keys;
  messageIsText: boolean;
  pin: string;
  quantity: string;
  recipientId: string;
  recipientPublicKey: string;
  shouldEncryptMessage?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor(private apiService: ApiService) {

  }

  public async getToken(id: string): Promise<Asset> {
    return this.apiService.api.asset.getAsset(id);
  }

  public async getPriceInfo(id: string): Promise<PriceInfo> {
    const {trades} = await this.apiService.api.service.query('getTrades', {
      asset: id,
      firstIndex: 0,
      lastIndex: 1
    });

    if (!trades.length) {
      return {
        amount: '0',
        change: 0,
      };
    }

    const {decimals, priceNQT} = trades[0];
    const amount = Amount.fromPlanck(priceNQT).multiply(Math.pow(10, decimals)).getSigna();
    const change = trades[1] && trades[1].priceNQT > 0 ? (trades[0].priceNQT / trades[1].priceNQT) - 1 : 0;

    return {
      amount,
      change
    };
  }

  private getSendersSignPrivateKey(pin: string, keys: Keys): string {
    const privateKey = decryptAES(keys.signPrivateKey, hashSHA256(pin));
    if (!privateKey) {
      throw new KeyDecryptionException();
    }
    return privateKey;
  }

  async gatherTokenData(tokenId: string, balanceQNT: string): Promise<TokenData> {
    const [token, priceInfo] = await Promise.all([this.getToken(tokenId), this.getPriceInfo(tokenId)]);

    const decimalFactor = Math.pow(10, token.decimals);
    const supply = parseInt(token.quantityQNT, 10) / decimalFactor;
    const balance =  parseInt(balanceQNT, 10) / decimalFactor;
    const total = balance * parseFloat(priceInfo.amount);

    return {
      id: tokenId,
      balance,
      supply,
      decimals: token.decimals,
      name: token.name,
      description: token.description,
      priceInfo,
      total
    };
  }

  async fetchAccountTokens(account: Account): Promise<TokenData[]> {
    const promises = account.assetBalances.map((balance) => {
      const {asset, balanceQNT} = balance;
      return this.gatherTokenData(asset, balanceQNT);
    });
    return await Promise.all(promises);
  }

  async transferToken(transferRequest: TransferTokenRequest): Promise<void> {

  }
}
