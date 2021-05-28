import {tokenizeReedSolomonAddress} from '../tokenizeReedSolomonAddress';

describe('tokenizeReedSolomonAddress', () => {

    it('should return all parts as expected - non-extended address', () => {
        expect(tokenizeReedSolomonAddress('BURST-K37B-9V85-FB95-793HN')).toStrictEqual({
            prefix: 'BURST',
            rs: 'K37B-9V85-FB95-793HN',
            extension: ''
        });
        expect(tokenizeReedSolomonAddress('S-K37B-9V85-FB95-793HN')).toStrictEqual({
            prefix: 'S',
            rs: 'K37B-9V85-FB95-793HN',
            extension: ''
        });
        expect(tokenizeReedSolomonAddress('TS-K37B-9V85-FB95-793HN')).toStrictEqual({
            prefix: 'TS',
            rs: 'K37B-9V85-FB95-793HN',
            extension: ''
        });
    });

    it('should return all parts as expected - extended address', () => {
        expect(tokenizeReedSolomonAddress('BURST-9K9L-4CB5-88Y5-F5G4Z-1TXTEKKQJ9E1P5COO4IEUNKUJ2YTE0ETSF8UVVRSOKNJGX07WI')).toStrictEqual({
            prefix: 'BURST',
            rs: '9K9L-4CB5-88Y5-F5G4Z',
            extension: '1TXTEKKQJ9E1P5COO4IEUNKUJ2YTE0ETSF8UVVRSOKNJGX07WI'
        });
        expect(tokenizeReedSolomonAddress('S-9K9L-4CB5-88Y5-F5G4Z-1TXTEKKQJ9E1P5COO4IEUNKUJ2YTE0ETSF8UVVRSOKNJGX07WI')).toStrictEqual({
            prefix: 'S',
            rs: '9K9L-4CB5-88Y5-F5G4Z',
            extension: '1TXTEKKQJ9E1P5COO4IEUNKUJ2YTE0ETSF8UVVRSOKNJGX07WI'
        });
        expect(tokenizeReedSolomonAddress('TS-9K9L-4CB5-88Y5-F5G4Z-1TXTEKKQJ9E1P5COO4IEUNKUJ2YTE0ETSF8UVVRSOKNJGX07WI')).toStrictEqual({
            prefix: 'TS',
            rs: '9K9L-4CB5-88Y5-F5G4Z',
            extension: '1TXTEKKQJ9E1P5COO4IEUNKUJ2YTE0ETSF8UVVRSOKNJGX07WI'
        });
    });

    it('should throw error for invalid addresses', () => {
        expect(() => {
            tokenizeReedSolomonAddress('somestring');
        }).toThrow('Invalid Reed-Solomon Address Format: somestring');
        expect(() => {
            tokenizeReedSolomonAddress('');
        }).toThrow('Invalid Reed-Solomon Address Format: ');
        expect(() => {
            tokenizeReedSolomonAddress('TS-9K9L-4CB5-88Y5');
        }).toThrow('Invalid Reed-Solomon Address Format: ');
        expect(() => {
            tokenizeReedSolomonAddress('TS-9K9L-4CB5-88Y5-09e38e-00727-ihagsg');
        }).toThrow('Invalid Reed-Solomon Address Format: ');
    });
});
