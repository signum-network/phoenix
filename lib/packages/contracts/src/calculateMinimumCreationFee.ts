/** @module contracts */

/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {convertNumberToNQTString} from '@burstjs/util';
import {countCodePages} from './countCodePages';

/**
 * Calculates the minimum creation fee of the contract
 *
 * @param hexCode The contracts code in hex form
 * @return The minimum fee expressed in Planck
 */
export function calculateMinimumCreationFee(hexCode: string ): string {
    const DataPages = 1; // no data supported yet, so we put minimum value
    return convertNumberToNQTString(2 + countCodePages(hexCode) + DataPages);
}
