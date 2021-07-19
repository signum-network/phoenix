import {ChainTime} from '../chainTime';

describe('BlockTime', () => {
    describe('fromBlockTimestamp', () => {
        it('should create correctly', () => {
            const blockTime = ChainTime.fromChainTimestamp(142850535);
            expect(blockTime.getChainTimestamp()).toBe(142850535);
            expect(blockTime.getDate().toISOString()).toBe('2019-02-19T10:42:15.000Z');
        });

        it('should set to genesis Date at timestamp 0', () => {
            const blockTime = ChainTime.fromChainTimestamp(0);
            expect(blockTime.getDate().toISOString()).toBe('2014-08-11T02:00:00.000Z');
        });

        it('should accept negative timestamp (before genesis block)', () => {
            const blockTime = ChainTime.fromChainTimestamp(-1);
            expect(blockTime.getDate().toISOString()).toBe('2014-08-11T01:59:59.000Z');
        });
    });

    describe('fromDate', () => {
        it('should create correctly', () => {
            const blockTime = ChainTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(blockTime.getChainTimestamp()).toBe(142850535);
            expect(blockTime.getDate().toISOString()).toBe('2019-02-19T10:42:15.000Z');
        });

        it('should set to genesis Date at timestamp 0', () => {
            const blockTime = ChainTime.fromDate(new Date('2014-08-11T02:00:00.000Z'));
            expect(blockTime.getChainTimestamp()).toBe(0);
        });

        it('should accept date before genesis block', () => {
            const blockTime = ChainTime.fromDate(new Date('2014-08-11T01:59:59.000Z'));
            expect(blockTime.getChainTimestamp()).toBe(-1);
        });
    });

    describe('setBlockTimestamp', () => {
        it('should set correctly', () => {
            const blockTime = ChainTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(blockTime.getChainTimestamp()).toBe(142850535);
            blockTime.setChainTimestamp(0);
            expect(blockTime.getDate().toISOString()).toBe('2014-08-11T02:00:00.000Z');
        });
    });

    describe('setDate', () => {
        it('should set correctly', () => {
            const blockTime = ChainTime.fromChainTimestamp(0);
            expect(blockTime.getChainTimestamp()).toBe(0);
            blockTime.setDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(blockTime.getChainTimestamp()).toBe(142850535);
        });
    });

    describe('getEpoch', () => {
        it('should return correct value', () => {
            const date = new Date('2019-02-19T10:42:15.000Z');
            const blockTime = ChainTime.fromDate(date);
            expect(blockTime.getEpoch()).toBe(date.getTime());
        });
    });

    describe('equals', () => {
        it('should be equal', () => {
            const blockTime1 = ChainTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            const blockTime2 = ChainTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(blockTime1.equals(blockTime2)).toBeTruthy();
        });
        it('should not be equal', () => {
            const blockTime1 = ChainTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            const blockTime2 = ChainTime.fromDate(new Date('2019-02-20T10:42:15.000Z'));
            expect(blockTime1.equals(blockTime2)).toBeFalsy();
        });
    });

    describe('after', () => {
        it('should be after', () => {
            const blockTime1 = ChainTime.fromDate(new Date('2019-02-20T10:42:15.000Z'));
            const blockTime2 = ChainTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(blockTime1.after(blockTime2)).toBeTruthy();
        });
        it('should not be after', () => {
            const blockTime1 = ChainTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            const blockTime2 = ChainTime.fromDate(new Date('2019-02-20T10:42:15.000Z'));
            expect(blockTime1.after(blockTime2)).toBeFalsy();
        });
        it('should not be before for equal burst times', () => {
            const blockTime1 = ChainTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            const blockTime2 = ChainTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(blockTime1.after(blockTime2)).toBeFalsy();
        });
    });

    describe('before', () => {
        it('should be before', () => {
            const blockTime1 = ChainTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            const blockTime2 = ChainTime.fromDate(new Date('2019-02-20T10:42:15.000Z'));
            expect(blockTime1.before(blockTime2)).toBeTruthy();
        });
        it('should not be before', () => {
            const blockTime1 = ChainTime.fromDate(new Date('2019-02-20T10:42:15.000Z'));
            const blockTime2 = ChainTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(blockTime1.before(blockTime2)).toBeFalsy();
        });
        it('should not be before for equal burst times', () => {
            const blockTime1 = ChainTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            const blockTime2 = ChainTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(blockTime1.before(blockTime2)).toBeFalsy();
        });
    });

});
