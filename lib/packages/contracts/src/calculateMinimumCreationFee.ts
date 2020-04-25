/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {BurstValue, FeeQuantPlanck, OneBurstPlanck} from '@burstjs/util';
import {countCodePages} from './countCodePages';

/**
 * Calculates the minimum creation fee of the contract
 *
 * @param hexCode The contracts code in hex form
 * @return The minimum fee expressed in Planck
 * @module contracts
 */
export function calculateMinimumCreationFee(hexCode: string, isCIP20active: boolean = false): BurstValue {
    const DataPages = 1; // no data supported yet, so we put minimum value
    const baseFee = BurstValue.fromPlanck((isCIP20active ? FeeQuantPlanck * 10 : OneBurstPlanck).toString(10));
    return baseFee.multiply(2 + countCodePages(hexCode) + DataPages);
}
