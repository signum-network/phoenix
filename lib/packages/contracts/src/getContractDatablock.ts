/** @module contracts */

/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {convertHexEndianess} from '@burstjs/util';
import {Contract} from './typings/contract';

/**
 * Extracts a variables value as hexadecimal string from a contract's machine data
 *
 * This is a generic function to extract arbitrary data from a contract. It's recommended to use the [[ContractDataView]] class instead
 *
 * @param contract The contract
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

    return convertHexEndianess(contract.machineData.substr(startIndex, length));
}
