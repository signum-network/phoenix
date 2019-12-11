import {ContractDataView} from '../ContractDataView';

describe('ContractDataView', () => {
    const contract = {
        // tslint:disable-next-line:max-line-length
        machineData: 'a23677e9ce2322cf' // 0
            + '1acf3c5ef2907048' // 1
            + '961919a7b3030000' // 2
            + '0000000000000000' // 3
            + '0074736554206c61' // 4
            + '6e6f697469646441' // 5
    };

    // @ts-ignore
    const helper = new ContractDataView(contract);


    describe('getVariableAsString', () => {
        it('returns correct string value of variable', () => {
            expect(helper.getVariableAsString(5)).toBe('Addition');
        });
    });

    describe('getDatablockAsString', () => {
        it('returns correctly hex values from defined block', () => {
            expect(helper.getDataBlocksAsString(4, 2)).toBe('Additional Test');
        });
        it('returns correctly hex values from defined begin until end', () => {
            expect(helper.getDataBlocksAsString(3)).toBe('Additional Test');
        });
    });

    describe('getVariableAsDecimal', () => {
        it('returns correctly decimal values at given positions', () => {
            expect(helper.getVariableAsDecimal(2)).toBe('4070137469334');
        });
    });

    describe('getVariable', () => {
        it('returns correctly hex data at given positions', () => {
            expect(helper.getVariable(2)).toBe('000003b3a7191996');
        });
    });

    describe('getHexDataAt', () => {
        it('returns correctly hexadecimal block values at given position', () => {
            expect(helper.getHexDataAt(0, 8)).toBe('e97736a2');
            expect(helper.getHexDataAt(0, 32)).toBe('487090f25e3ccf1acf2223cee97736a2');
        });
    });
});
