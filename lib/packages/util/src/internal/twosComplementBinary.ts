/** @ignore */
/** @internal */
/** @module util */
import BigNumber from 'bignumber.js';

export const twosComplementBinary = (bn: BigNumber) => {
    // we manually implement our own two's complement (flip bits, add one)
    let bin = bn.multipliedBy(-1).toString(2);
    while (bin.length % 8) {
        bin = '0' + bin;
    }
    const prefix = ('1' === bin[0] && -1 !== bin.slice(1).indexOf('1')) ? '11111111' : '';
    bin = bin.split('').map(i => '0' === i ? '1' : '0').join('');
    return new BigNumber(prefix + bin, 2).plus(1);
};
