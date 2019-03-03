// tslint:disable:no-bitwise
/** @module util */

import {GenesisBlockTime} from './internal';

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)
 * @param burstTimestamp The numeric Id
 * @return Unix Epoch Time (milliseconds since 01.01.1970)
 */
export const convertBurstTimeToEpochTime = (burstTimestamp: number): number => {
    return  (GenesisBlockTime + burstTimestamp) * 1000;
};
