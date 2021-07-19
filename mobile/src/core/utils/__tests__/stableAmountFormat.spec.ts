import {stableAmountFormat, stableParseSignaAmount } from '../amount';
import { Amount } from '@signumjs/util';

describe('amount', () => {
    describe('stableAmountFormat', () => {
        it('it should return a valid float string - valid inputs', () => {
            expect(stableAmountFormat('1.01')).toEqual('1.01');
            expect(stableAmountFormat('1')).toEqual('1');
            expect(stableAmountFormat('01')).toEqual('1');
            expect(stableAmountFormat('0,00')).toEqual('0.00');
            expect(stableAmountFormat('00000')).toEqual('0');
            expect(stableAmountFormat('1.001000')).toEqual('1.001000');
        });
        it('it should return a valid float string - invalid inputs', () => {
            expect(stableAmountFormat('1.01.123')).toEqual('1.01');
            expect(stableAmountFormat('1,01,123')).toEqual('1.01');
            expect(stableAmountFormat('1,,,,01,123')).toEqual('1.01');
            expect(stableAmountFormat('1..01,123')).toEqual('1.01');
            expect(stableAmountFormat('1....01,123')).toEqual('1.01');
            expect(stableAmountFormat('vbags')).toEqual('');
            expect(stableAmountFormat('1,01vbags')).toEqual('1.01');
            expect(stableAmountFormat('vga1,01vbags')).toEqual('1.01');
            expect(stableAmountFormat('#$%-1,01vbags')).toEqual('1.01');
        });
    });
    describe('stableParseSignaAmount', () => {
        it('it should return Amount.Zero() on invalid inputs', () => {
            expect(stableParseSignaAmount('1,0')).toEqual(Amount.Zero());
            expect(stableParseSignaAmount('text')).toEqual(Amount.Zero());
        });
        it('it should return a correct Amount object', () => {
            expect(stableParseSignaAmount('0')).toEqual(Amount.Zero());
            expect(stableParseSignaAmount('12.1234')).toEqual(Amount.fromSigna(12.1234));
        });
    });
});
