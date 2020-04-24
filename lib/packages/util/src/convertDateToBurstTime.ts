/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {GenesisBlockTime} from './internal';

/**
 * Converts a Date into Burst/Block Time (seconds since genesis block)
 * @param date The date to be converted
 * @return The Burst Timestamp
 * @deprecated
 * <div class="deprecated">
 *     Use [[BurstTime.fromDate]] instead
 * </div>
 * @module util
 */
export const convertDateToBurstTime = (date: Date): number => {
    return Math.round(date.getTime() / 1000) - GenesisBlockTime;
};
