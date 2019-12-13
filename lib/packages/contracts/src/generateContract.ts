/** @module contracts */

/**
 * Copyright (c) 2019 Burst Apps Team
 *
 * Credits to AJ ONeal for the two-complements stuff
 * https://coolaj86.com/articles/convert-decimal-to-hex-with-js-bigints/
 */

import {GenerateContractArgs} from './typings/args';
import {generateContractBytes} from './internal/generateContractBytes';
import {convertByteArrayToHexString} from '@burstjs/util';

export const generateContract = (args: GenerateContractArgs): string => {
    const bytes = generateContractBytes(args);
    return convertByteArrayToHexString(new Uint8Array(bytes));
};
