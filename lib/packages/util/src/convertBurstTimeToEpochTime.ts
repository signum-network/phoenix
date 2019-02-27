// tslint:disable:no-bitwise
/** @module util */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */


const GenesisBlockTime = Math.floor(
    new Date('2014-08-11T02:00:00.000Z').getTime() / 1000
);


/**
 * Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)
 * @param burstTimestamp The numeric Id
 * @return Unix Epoch Time (milliseconds since 01.01.1970)
 */
export const convertBurstTimeToEpochTime = (burstTimestamp: number): number => {
    return  (GenesisBlockTime + burstTimestamp) * 1000;
};
