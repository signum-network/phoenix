/** @module core */

/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {Contract} from '../typings/contract';

/**
 * Extracts a variables value as hexadecimal string from a contract's machine data
 *
 * This is a generic function to extract arbitrary data from a contract. I's recommended to use the [[ContractHelper]] class instead
 *
 * @param position The variables position
 * @param length The length of data to be extracted
 * @return The value as hexadecimal string (already considering endianness)
 */
export function getContractDatablock(contract: Contract, position: number, length: number = 16): string {

    const startIndex = position * 16;
    const requiredSize = startIndex + length;
    if (requiredSize > contract.machineData.length) {
        throw new Error(`Insufficient length for variable at position: ${startIndex} (and given length: ${length})`);
    }

    if (requiredSize % 2 !== 0) {
        throw new Error(`Invalid position: ${startIndex} (or given length: ${length}) - must be at least multiple of 2`);
    }

    let result = '';
    const rawData = contract.machineData.substr(startIndex, length);
    for (let i = rawData.length - 1; i >= 0; i -= 2) {
        result += rawData[i - 1] + rawData[i];
    }
    return result;
}
