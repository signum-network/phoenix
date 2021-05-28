// tslint:disable:no-bitwise
/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2021 Signum Network
 */

import {tokenizeReedSolomonAddress} from './tokenizeReedSolomonAddress';
import {isDeeplyValidAddress} from './internal';

/**
 * @internal
 * Ensures a valid Reed Solomon address format, like <Prefix>-XXXX-XXXX-XXXX-XXXXX
 * @param {string} address The address string
 * @throws if is not a valid address
 * @module core
 */
export const ensureReedSolomonAddress = (address: string): void => {
    const tokens = tokenizeReedSolomonAddress(address);
    if (!isDeeplyValidAddress(tokens.rs)) {
        throw new Error(`Invalid Reed-Solomon Address: ${address}`);
    }
};


