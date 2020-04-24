/**
 * Copyright (c) 2019 Burst Apps Team
 *
 * Credits to AJ ONeal for the two-complements stuff
 * https://coolaj86.com/articles/convert-decimal-to-hex-with-js-bigints/
 */

import './internal/padStartPolyfill';
import BigNumber from 'bignumber.js';
import {convertHexEndianess} from '@burstjs/util';
import {GenerateMethodCallArgs, MethodArgument} from './typings/args';

/**
 * @internal
 * @param numeric
 */
const numericToHex = (numeric: string): string => {
    let bn = new BigNumber(numeric);

    if (bn.lt(0)) {
        bn = twosComplementBinary(bn);
    }

    const hex = bn.toString(16);
    return hex.length % 2 ? '0' + hex : hex;
};

/**
 * @internal
 * @param bn
 */
const twosComplementBinary = (bn: BigNumber) => {
    // we manually implement our own two's complement (flip bits, add one)
    let bin = bn.multipliedBy(-1).toString(2);
    while (bin.length % 8) {
        bin = '0' + bin;
    }
    const prefix = ('1' === bin[0] && -1 !== bin.slice(1).indexOf('1')) ? '11111111' : '';
    bin = bin.split('').map(i => '0' === i ? '1' : '0').join('');
    return new BigNumber(prefix + bin, 2).plus(1);
};

/**
 * @internal
 * @param value
 */
const convertArgument = (value: MethodArgument): string => {
    if (typeof (value) === 'boolean') {
        return value ? '1' : '0';
    }
    if (typeof (value) === 'number') {
        return `${value}`;
    }
    return value;
};

/**
 * Generates a method call message of a contracts public method. The message can be sent using for example
 * [[MessageApi.sendMessage]] with `messageIsText = false` or [[ContractApi.callContractMethod]]]
 * @param args The argument object
 * @return A hex string that can be used as contracts transaction message
 * @module contracts
 */
export const generateMethodCall = (args: GenerateMethodCallArgs): string => {
    const MaxArgs = 3;
    const argArray = args.methodArgs ? [args.methodHash, ...args.methodArgs] : [args.methodHash];
    if (argArray.length > MaxArgs + 1) {
        throw new Error(`At maximum ${MaxArgs} are supported`);
    }
    return argArray
        .map(convertArgument)
        // @ts-ignore
        .map(long => numericToHex(long).padStart(16, '0'))
        .map(convertHexEndianess)
        .join('');
};
