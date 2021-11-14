// based on https://github.com/signum-network/CIPs/blob/master/cip-0031.md

import { Amount, FeeQuantPlanck } from '@signumjs/util';
import { Injectable } from '@angular/core';
import {
  TransactionArbitrarySubtype,
  TransactionAssetSubtype, TransactionEscrowSubtype,
  TransactionPaymentSubtype,
  TransactionType
} from '@signumjs/core';


interface FeeRegime {
  feeBase: Amount;
  minFactor: number;
  maxFactor: number;
}

@Injectable({
  providedIn: 'root'
})
export class FeeRegimeService {

  static MinimumPayloadLength = 176;

  constructor() {
    this.initMap();
  }

  feeRegimeMap = new Map<string, { min: number, max: number }>();
  private feeBase: Amount = Amount.fromPlanck(FeeQuantPlanck);

  private static asKey(type: any, subtype: any): string {
    return `${type}:${subtype}`;
  }

  private initMap(): void {
    this.setFeeRegime(TransactionType.Payment, TransactionPaymentSubtype.Ordinary, 1, 6);
    this.setFeeRegime(TransactionType.Payment, TransactionPaymentSubtype.MultiOut, 1, 6);
    this.setFeeRegime(TransactionType.Payment, TransactionPaymentSubtype.MultiOutSameAmount, 1, 6);
    this.setFeeRegime(TransactionType.Arbitrary, TransactionArbitrarySubtype.Message, 1, 6);
    this.setFeeRegime(TransactionType.Arbitrary, TransactionArbitrarySubtype.AliasAssignment, 20, 120);
    this.setFeeRegime(TransactionType.Arbitrary, TransactionArbitrarySubtype.AccountInfo, 1, 6);
    this.setFeeRegime(TransactionType.Asset, TransactionAssetSubtype.AssetIssuance, 15000, 15000);
    this.setFeeRegime(TransactionType.Asset, TransactionAssetSubtype.AssetTransfer, 1, 6);
    this.setFeeRegime(TransactionType.Escrow, TransactionEscrowSubtype.SubscriptionSubscribe, 1, 6);
  }

  private setFeeRegime(type: any, subtype: any, min: number, max: number): void {
    this.feeRegimeMap.set(FeeRegimeService.asKey(type, subtype), {
      min, max
    });
  }

  public setFeeBase(feeBase: Amount): void {
    this.feeBase = feeBase;
  }

  public getFeeRegime(type: any, subtype: any): FeeRegime {
    const feeRegime = this.feeRegimeMap.get(FeeRegimeService.asKey(type, subtype));
    return {
      maxFactor: feeRegime ? feeRegime.max : 1,
      minFactor: feeRegime ? feeRegime.min : 1,
      feeBase: this.feeBase.clone()
    };
  }

  public getMaxFeeByType(type: any, subtype: any): Amount {
    const { feeBase, maxFactor } = this.getFeeRegime(type, subtype);
    return feeBase.multiply( maxFactor );
  }

  public calculateFeeByPayload(type: any, subtype: any, payloadLength: number = FeeRegimeService.MinimumPayloadLength): Amount {
    const { feeBase, maxFactor, minFactor } = this.getFeeRegime(type, subtype);
    const hasPayloadDependentFee = minFactor !== maxFactor;
    return hasPayloadDependentFee
      ? feeBase.multiply(Math.floor((FeeRegimeService.MinimumPayloadLength + payloadLength) / FeeRegimeService.MinimumPayloadLength))
      : feeBase.multiply( maxFactor );
  }
}
