import './internal/padStartPolyfill';
import BigNumber from 'bignumber.js';
import {convertHexEndianess} from '@burstjs/util';

const MaxArgsCount = 3;

const bnToHex2 = big => {
    let bn = new BigNumber(big);

    if (bn.lt(0)) {
        bn = twosComplementBinary(bn);
    }

    const hex = bn.toString(16);
    return hex.length % 2 ? '0' + hex : hex
};

const twosComplementBinary = (bn: BigNumber) => {
    // we manually implement our own two's complement (flip bits, add one)
    let bin = bn.multipliedBy(-1).toString(2);
    while (bin.length % 8) {
        bin = '0' + bin;
    }
    // carry over
    const prefix = bin[0] === '1' && bin.slice(1).indexOf('1') !== -1 ? '11111111' : '';

    // invert
    bin = bin.split('').map(i => '0' === i ? '1' : '0').join('');
    return new BigNumber(prefix + bin, 2).plus(1);
};

export const generateMethodCallHexMessage = (methodLong: string, ...argsLong): string => {
    if (argsLong.length > MaxArgsCount) {
        throw new Error(`Only ${MaxArgsCount} arguments allowed`);
    }

    const arg = [methodLong, ...argsLong]
        // @ts-ignore
        .map(long => bnToHex2(long).padStart(16, '0'))
        .map(convertHexEndianess);
    return arg.join('');
};
