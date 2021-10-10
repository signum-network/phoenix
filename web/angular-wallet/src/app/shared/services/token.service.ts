import {Injectable} from '@angular/core';
import {ApiService} from '../../api.service';
import {
  Account,
  Address,
  Asset,
  TransactionId
} from '@signumjs/core';
import {
  Keys
} from '@signumjs/crypto';
import {Amount} from '@signumjs/util';
import {getPrivateSigningKey} from '../../util/security/getPrivateSigningKey';
import {getPrivateEncryptionKey} from '../../util/security/getPrivateEncryptionKey';
import {createMessageAttachment} from '../../util/transaction/createMessageAttachment';
import {Recipient} from '../../components/recipient-input/recipient-input.component';

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
  token: TokenData;
  deadline?: number;
  fee: Amount;
  keys: Keys;
  pin: string;
  quantity: number;
  recipient: Recipient;
  message?: string;
  isEncrypted?: boolean;
  isText?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private apiService: ApiService,
  ) {

  }

  private async getToken(id: string): Promise<Asset> {
    return this.apiService.api.asset.getAsset(id);
  }

  public async fetchTokenData(tokenId: string, account: Account): Promise<TokenData> {
    const assetBalance = account.assetBalances && account.assetBalances.find(({asset}) => asset === tokenId);
    if (!assetBalance) {
      throw new Error('Account doesn\'t own that token');
    }
    return this.gatherTokenData(tokenId, assetBalance.balanceQNT);
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


  async gatherTokenData(tokenId: string, balanceQNT: string): Promise<TokenData> {
    const [token, priceInfo] = await Promise.all([this.getToken(tokenId), this.getPriceInfo(tokenId)]);

    const decimalFactor = Math.pow(10, token.decimals);
    const supply = parseInt(token.quantityQNT, 10) / decimalFactor;
    const balance = parseInt(balanceQNT, 10) / decimalFactor;
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
    if (!account.assetBalances) {
      return Promise.resolve([]);
    }

    const promises = account.assetBalances.map((balance) => {
      const {asset, balanceQNT} = balance;
      return this.gatherTokenData(asset, balanceQNT);
    });
    const tokens = await Promise.all(promises);
    tokens.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    return tokens;
  }

  async transferToken(request: TransferTokenRequest): Promise<TransactionId> {
    const {
      pin,
      fee,
      quantity,
      recipient,
      keys,
      token,
      message,
      isEncrypted,
      isText
    } = request;

    const attachment = message ? createMessageAttachment({
      isEncrypted,
      isText,
      encryptionKey: getPrivateEncryptionKey(pin, keys),
      recipientPublicKey: recipient.publicKey,
      message
    }) : undefined;

    const decimalFactor = Math.pow(10, token.decimals);
    const realQuantity = quantity * decimalFactor;

    return this.apiService.api.asset.transferAsset({
      asset: token.id,
      attachment,
      feePlanck: fee.getPlanck(),
      recipientId: Address.create(recipient.addressRS).getNumericId(),
      recipientPublicKey: recipient.publicKey,
      quantity: realQuantity,
      senderPrivateKey: getPrivateSigningKey(pin, keys),
      senderPublicKey: keys.publicKey,
    });
  }
}
