import {BurstValue, BurstValueFormat} from '../burstValue';

describe('BurstValue', () => {
    describe('fromBurst', () => {
        it('Should create an instance correctly', () => {
            expect(BurstValue.fromBurst(1).getBurst()).toEqual('1');
            expect(BurstValue.fromBurst('1').getBurst()).toEqual('1');
        });
        it('Should throw an error on invalid value', () => {
            expect(() => BurstValue.fromBurst('')).toThrow();
            expect(() => BurstValue.fromBurst('test')).toThrow();
        });
    });
    describe('fromPlanck', () => {
        it('Should create an instance correctly', () => {
            expect(BurstValue.fromPlanck('1').getBurst()).toEqual('0.00000001');
            expect(BurstValue.fromPlanck('100').getBurst()).toEqual('0.000001');
        });
        it('Should throw an error on invalid value', () => {
            expect(() => BurstValue.fromPlanck('')).toThrow();
            expect(() => BurstValue.fromPlanck('test')).toThrow();
        });
    });
    describe('getPlanck', () => {
        it('Should return value correctly', () => {
            expect(BurstValue.fromPlanck('1').getPlanck()).toEqual('1');
            expect(BurstValue.fromPlanck('0').getPlanck()).toEqual('0');
            expect(BurstValue.fromBurst('1').getPlanck()).toEqual('100000000');
        });
    });
    describe('setPlanck', () => {
        it('Should set value correctly', () => {
            const burstValue = BurstValue.fromPlanck('0');
            burstValue.setPlanck('10');
            expect(burstValue.getPlanck()).toEqual('10');
        });
        it('Should throw error for invalid value', () => {
            const burstValue = BurstValue.fromPlanck('0');
            expect(() => {
                burstValue.setPlanck('');
            }).toThrow();
        });
    });
    describe('getBurst', () => {
        it('Should return value correctly', () => {
            expect(BurstValue.fromBurst('1').getBurst()).toEqual('1');
            expect(BurstValue.fromBurst('0').getBurst()).toEqual('0');
            expect(BurstValue.fromPlanck('1').getBurst()).toEqual('0.00000001');
        });
    });
    describe('setBurst', () => {
        it('Should set value correctly', () => {
            const burstValue = BurstValue.fromBurst('0');
            burstValue.setBurst('10');
            expect(burstValue.getBurst()).toEqual('10');
        });
        it('Should throw error for invalid value', () => {
            const burstValue = BurstValue.fromBurst('0');
            expect(() => {
                burstValue.setBurst('');
            }).toThrow();
        });
    });
    describe('getRaw', () => {
        it('Should return value correctly', () => {
            expect(BurstValue.fromPlanck('1').getRaw().eq(1)).toBeTruthy();
            expect(BurstValue.fromBurst('1').getRaw().eq(1E8)).toBeTruthy();
        });
        it('Returned value should be immutable', () => {
            const burstValue = BurstValue.fromBurst('1');
            expect(burstValue.getBurst()).toEqual('1');
            const raw = burstValue.getRaw();
            raw.add(1);
            expect(burstValue.getBurst()).toEqual('1');
        });
    });
    describe('toString', () => {
        it('Return String as Planck', () => {
            const burstValue = BurstValue.fromBurst('10');
            expect(burstValue.toString(BurstValueFormat.PLANCK)).toEqual('1000000000 Planck');
        });
        it('Return String as BURST', () => {
            const burstValue = BurstValue.fromBurst('10');
            expect(burstValue.toString()).toEqual('10 BURST');
            expect(burstValue.toString(BurstValueFormat.BURST)).toEqual('10 BURST');
        });
    });
    describe('equals', () => {
        it('should return true for value equality', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            const burstValue2 = BurstValue.fromBurst('10');
            expect(burstValue1.equals(burstValue2)).toBeTruthy();
        });
        it('should return false for value inequality', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            const burstValue2 = BurstValue.fromBurst('20');
            expect(burstValue1.equals(burstValue2)).toBeFalsy();
        });
    });
    describe('less', () => {
        it('should return true for lesser value', () => {
            const burstValue1 = BurstValue.fromBurst('1');
            const burstValue2 = BurstValue.fromBurst('10');
            expect(burstValue1.less(burstValue2)).toBeTruthy();
        });
        it('should return false for non-lesser value', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            const burstValue2 = BurstValue.fromBurst('1');
            expect(burstValue1.less(burstValue2)).toBeFalsy();
            expect(burstValue1.less(burstValue1)).toBeFalsy();
        });
    });
    describe('lessOrEqual', () => {
        it('should return true for lesser-or-equal value', () => {
            const burstValue1 = BurstValue.fromBurst('1');
            const burstValue2 = BurstValue.fromBurst('10');
            expect(burstValue1.lessOrEqual(burstValue2)).toBeTruthy();
            expect(burstValue1.lessOrEqual(burstValue1)).toBeTruthy();
        });
        it('should return false for non-lesser-or-equal value', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            const burstValue2 = BurstValue.fromBurst('1');
            expect(burstValue1.lessOrEqual(burstValue2)).toBeFalsy();
        });
    });
    describe('greater', () => {
        it('should return true for greater value', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            const burstValue2 = BurstValue.fromBurst('1');
            expect(burstValue1.greater(burstValue2)).toBeTruthy();
        });
        it('should return false for non-greater value', () => {
            const burstValue1 = BurstValue.fromBurst('1');
            const burstValue2 = BurstValue.fromBurst('10');
            expect(burstValue1.greater(burstValue2)).toBeFalsy();
            expect(burstValue1.greater(burstValue1)).toBeFalsy();
        });
    });
    describe('greaterOrEqual', () => {
        it('should return true for greater-or-equal value', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            const burstValue2 = BurstValue.fromBurst('1');
            expect(burstValue1.greaterOrEqual(burstValue2)).toBeTruthy();
            expect(burstValue1.greaterOrEqual(burstValue1)).toBeTruthy();
        });
        it('should return false for non-greater-or-equal value', () => {
            const burstValue1 = BurstValue.fromBurst('1');
            const burstValue2 = BurstValue.fromBurst('10');
            expect(burstValue1.greaterOrEqual(burstValue2)).toBeFalsy();
        });
    });
    describe('add', () => {
        it('should return correct sum single', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            const burstValue2 = BurstValue.fromBurst('1');
            expect(burstValue1.add(burstValue2).getBurst()).toBe('11');
        });
        it('should return correct sum multiple', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            const burstValue2 = BurstValue.fromBurst('1.25');
            expect(burstValue1.add(burstValue1).add(burstValue2).getBurst()).toBe('21.25');
        });
    });
    describe('subtract', () => {
        it('should return correct difference - single', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            const burstValue2 = BurstValue.fromBurst('1');
            expect(burstValue1.subtract(burstValue2).getBurst()).toBe('9');
        });
        it('should return correct difference - multiple', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            const burstValue2 = BurstValue.fromBurst('1');
            expect(burstValue1.subtract(burstValue2).subtract(burstValue2).getBurst()).toBe('8');
        });
        it('should return correct difference - negative', () => {
            const burstValue1 = BurstValue.fromBurst('1');
            const burstValue2 = BurstValue.fromBurst('10');
            expect(burstValue1.subtract(burstValue2).getBurst()).toBe('-9');
        });
    });
    describe('multiply', () => {
        it('should return correct product - single', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            expect(burstValue1.multiply(2).getBurst()).toBe('20');
        });
        it('should return correct product - fraction', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            expect(burstValue1.multiply(0.5).getBurst()).toBe('5');
        });
        it('should return correct product - multiple', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            expect(burstValue1.multiply(2).multiply(10).getBurst()).toBe('200');
        });
        it('should return correct product - identity', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            expect(burstValue1.multiply(1).getBurst()).toBe('10');
        });
        it('should return correct product - zero', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            expect(burstValue1.multiply(0).getBurst()).toBe('0');
        });
    });
    describe('divide', () => {
        it('should return correct quotient - single', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            expect(burstValue1.divide(2).getBurst()).toBe('5');
        });
        it('should return correct quotient - fraction', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            expect(burstValue1.divide(0.5).getBurst()).toBe('20');
        });
        it('should return correct quotient - identity', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            expect(burstValue1.divide(1).getBurst()).toBe('10');
        });
        it('should throw error div-by-zero', () => {
            const burstValue1 = BurstValue.fromBurst('10');
            expect(() => {
                burstValue1.divide(0).getBurst()
            }).toThrow();
        });
    });
});
