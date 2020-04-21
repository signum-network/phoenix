// tslint:disable:no-bitwise

import {GenesisBlockTime} from './internal';

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * @deprecated
 * <div class="deprecated">
 *     Use [[BurstTime.getEpoch()]] instead
 * </div>
 * Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)
 * @param burstTimestamp The numeric Id
 * @return Unix Epoch Time (milliseconds since 01.01.1970)
 * @module util
 */
export const convertBurstTimeToEpochTime = (burstTimestamp: number): number => {
    return  (GenesisBlockTime + burstTimestamp) * 1000;
};
