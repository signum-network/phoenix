/** @module util */
import {convertNQTStringToNumber} from './convertNQTStringToNumber';

/**
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Sums various NQT values and returns in Burst
 * @param nqts Variable amount list with NQT string
 * @return The sum of all amounts in BURST
 * @deprecated
 * <div class='deprecated'>
 *     Use [[Amount.add]] instead
 * </div>
 * @module util
 */
export function sumNQTStringToNumber(...nqts: string[]): number {
    return nqts.reduce( (sum, v) => sum + convertNQTStringToNumber(v), 0);
}
