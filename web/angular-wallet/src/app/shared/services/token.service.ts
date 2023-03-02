import { Injectable } from '@angular/core';
import {
  Asset,
  TransactionId
} from '@signumjs/core';
import {
  Keys
} from '@signumjs/crypto';
import { Amount, ChainValue } from '@signumjs/util';
import { getPrivateSigningKey } from 'app/util/security/getPrivateSigningKey';
import { getPrivateEncryptionKey } from 'app/util/security/getPrivateEncryptionKey';
import { createMessageAttachment } from 'app/util/transaction/createMessageAttachment';
import { Recipient } from 'app/components/recipient-input/recipient-input.component';
import { constants } from 'app/constants';
import { WalletAccount } from 'app/util/WalletAccount';
import { LedgerService } from 'app/ledger.service';
import { expMemo, memo } from '../../util/memo';

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
  quantity: ChainValue;
  signa?: Amount;
  recipient: Recipient;
  message?: string;
  isEncrypted?: boolean;
  isText?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public memoizedFetchAccountTokens: (key: string, account: WalletAccount) => Promise<TokenData[]>;

  constructor(
    private ledgerService: LedgerService
  ) {
    this.memoizedFetchAccountTokens = expMemo((key: string, account: WalletAccount) => {
      return this.fetchAccountTokensImpl(account);
    }, {
      expiry: 120_000
    });
  }

  public async fetchSingleTokenInfo(assetId: string): Promise<Asset> {
    return this.ledgerService.ledger.asset.getAsset({ assetId });
  }

  public async fetchTokenData(tokenId: string, account: WalletAccount): Promise<TokenData> {
    const assetBalance = account.assetBalances && account.assetBalances.find(({ asset }) => asset === tokenId);
    if (!assetBalance) {
      throw new Error('Account doesn\'t own that token');
    }
    return this.gatherTokenData(tokenId, assetBalance.balanceQNT);
  }

  private async getPriceInfo(id: string): Promise<PriceInfo> {
    const { trades } = await this.ledgerService.ledger.service.query('getTrades', {
      asset: id,
      firstIndex: 0,
      lastIndex: 1
    });

    if (!trades.length) {
      return {
        amount: '0',
        change: 0
      };
    }

    const { decimals, priceNQT } = trades[0];
    const amount = Amount.fromPlanck(priceNQT).multiply(Math.pow(10, decimals)).getSigna();
    const change = trades[1] && trades[1].priceNQT > 0 ? (trades[0].priceNQT / trades[1].priceNQT) - 1 : 0;

    return {
      amount,
      change
    };
  }


  private async gatherTokenData(tokenId: string, balanceQNT: string): Promise<TokenData> {
    const [token, priceInfo] = await Promise.all([this.fetchSingleTokenInfo(tokenId), this.getPriceInfo(tokenId)]);

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

  async fetchAccountTokens(account: WalletAccount): Promise<TokenData[]>{
    return this.memoizedFetchAccountTokens(`fetchAccountTokens-${account._id}`, account);
  }

  private async fetchAccountTokensImpl(account: WalletAccount): Promise<TokenData[]> {
    if (!account.assetBalances) {
      return Promise.resolve([]);
    }

    const promises = account.assetBalances.map((balance) => {
      const { asset, balanceQNT } = balance;

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

  transferToken(request: TransferTokenRequest): Promise<TransactionId> {
    const {
      pin,
      fee,
      quantity,
      recipient,
      keys,
      token,
      message,
      isEncrypted,
      isText,
      signa,
    } = request;

    const attachment = message ? createMessageAttachment({
      isEncrypted,
      isText,
      encryptionKey: getPrivateEncryptionKey(pin, keys),
      recipientPublicKey: recipient.publicKey,
      message
    }) : undefined;

    const recipientPublicKey = recipient.publicKey !== constants.smartContractPublicKey
    && recipient.publicKey !== ''
    && recipient.publicKey !== '0'
      ? recipient.publicKey
      : undefined;
    return this.ledgerService.ledger.asset.transferAsset({
      assetId: token.id,
      attachment,
      feePlanck: fee.getPlanck(),
      recipientId: recipient.addressId,
      recipientPublicKey,
      quantity: quantity.getAtomic(),
      amountPlanck: signa ? signa.getPlanck() : undefined,
      senderPrivateKey: getPrivateSigningKey(pin, keys),
      senderPublicKey: keys.publicKey
    }) as Promise<TransactionId>;
  }
}
