/** @module util */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {convertBurstTimeToEpochTime} from './convertBurstTimeToEpochTime';

/**
 * Converts a Burst/Block Time (seconds since genesis block) into Date
 * @param burstTimestamp The numeric Id
 * @return Date
 */
export const convertBurstTimeToDate = (burstTimestamp: number): Date => {
    return  new Date(convertBurstTimeToEpochTime(burstTimestamp));
};
