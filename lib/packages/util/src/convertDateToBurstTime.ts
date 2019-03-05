/** @module util */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {GenesisBlockTime} from './internal';

/**
 * Converts a Date into Burst/Block Time (seconds since genesis block)
 * @param date The date to be converted
 * @return The Burst Timestamp
 */
export const convertDateToBurstTime = (date: Date): number => {
    return (date.getTime() / 1000) - GenesisBlockTime;
};
