/**
 * Copyright (c) 2019 Burst Apps Team
 *
 * Credits to AJ ONeal for the two-complements stuff
 * https://coolaj86.com/articles/convert-decimal-to-hex-with-js-bigints/
 */

import {convertDecStringToHexString, convertHexEndianess} from '@signumjs/util';
import {GenerateMethodCallArgs, MethodArgument} from './typings/args';

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
        .map(long => convertDecStringToHexString(long, 16))
        .map(convertHexEndianess)
        .join('');
};
