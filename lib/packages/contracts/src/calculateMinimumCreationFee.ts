/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {BurstValue, FeeQuantPlanck, OneBurstPlanck} from '@burstjs/util';
import {countCodePages} from './countCodePages';

/**
 * Calculates the minimum creation fee of the contract
 *
 * @param hexCode The contracts code in hex form
 * @param isCIP20active If is true, the fee calculation for active CIP20 is applied (lowered fees),
 * otherwise the legacy calculation (BRS <V2.5) is applied
 * @return The minimum fee
 * @module contracts
 */
export function calculateMinimumCreationFee(hexCode: string, isCIP20active: boolean = false): BurstValue {
    const DataPages = 1; // no data supported yet, so we put minimum value
    const baseFee = BurstValue.fromPlanck((isCIP20active ? FeeQuantPlanck * 10 : OneBurstPlanck).toString(10));
    return baseFee.multiply(2 + countCodePages(hexCode) + DataPages);
}
