import {getContractDatablock} from '../getContractDatablock';

describe('getContractDatablock', () => {
    it('returns correctly hex values at given positions', () => {

        const contract = {
            machineData: 'a23677e9ce2322cf1acf3c5ef2907048961919a7b3030000b943729d08000000',
        };

        // @ts-ignore
        expect(getContractDatablock(contract, 0)).toBe('cf2223cee97736a2');
        // @ts-ignore
        expect(getContractDatablock(contract, 1)).toBe('487090f25e3ccf1a');
        // @ts-ignore
        expect(getContractDatablock(contract, 2)).toBe('000003b3a7191996');
    });


    it('throws exception on insufficient data length', () => {

        const contract = {
            machineData: 'a23677e9ce2322cf1acf3c5ef2907048',
        };

        try {
            // @ts-ignore
            getContractDatablock(contract, 1, 32);
            expect(false).toBe('Expected Exception');
        } catch (e) {
            expect(e.message).toContain('Insufficient length for variable at position: 16 (and given length: 32)');
        }
    });

    it('throws exception on incompatible parameters', () => {

        const contract = {
            machineData: 'a23677e9ce2322cf1acf3c5ef2907048',
        };

        try {
            // @ts-ignore
            getContractDatablock(contract, 1, 13);
            expect(false).toBe('Expected Exception');
        } catch (e) {
            expect(e.message).toContain('Invalid position: 16 (or given length: 13) - must be at least multiple of 2');
        }
    });

});
