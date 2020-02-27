import {BurstValue} from '../burstValue';

describe('BurstValue', () => {
    describe('fromBurst', () => {
        it('Should create an instance correctly', () => {
            expect(BurstValue.fromBurst(1).burst).toEqual('1');
            expect(BurstValue.fromBurst('1').burst).toEqual('1');
        });
        it('Should throw an error on invalid value', () => {
            expect(() => BurstValue.fromBurst('')).toThrow();
            expect(() => BurstValue.fromBurst('test')).toThrow();
        });
    });
    describe('fromPlanck', () => {
        it('Should create an instance correctly', () => {
            expect(BurstValue.fromPlanck('1').burst).toEqual('1e-8');
            expect(BurstValue.fromPlanck('100').burst).toEqual('0.000001');
        });
        it('Should throw an error on invalid value', () => {
            expect(() => BurstValue.fromPlanck('')).toThrow();
            expect(() => BurstValue.fromPlanck('test')).toThrow();
        });
    });
});
