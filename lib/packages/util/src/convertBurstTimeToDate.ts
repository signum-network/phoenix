/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {convertBurstTimeToEpochTime} from './convertBurstTimeToEpochTime';

/**
 * @deprecated
 * <div class="deprecated">
 *     Use [[BurstTime.getDate()]] instead
 * </div>
 * Converts a Burst/Block Time (seconds since genesis block) into Date
 * @param burstTimestamp The numeric Id
 * @return Date
 * @module util
 */
export const convertBurstTimeToDate = (burstTimestamp: number): Date => {
    return  new Date(convertBurstTimeToEpochTime(burstTimestamp));
};
