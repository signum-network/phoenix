import {BurstTime} from '../burstTime';

describe('BurstTime', () => {
    describe('fromBurstTimestamp', () => {
        it('should create correctly', () => {
            const burstTime = BurstTime.fromBurstTimestamp(142850535);
            expect(burstTime.getBurstTimestamp()).toBe(142850535);
            expect(burstTime.getDate().toISOString()).toBe('2019-02-19T10:42:15.000Z');
        });

        it('should set to genesis Date at timestamp 0', () => {
            const burstTime = BurstTime.fromBurstTimestamp(0);
            expect(burstTime.getDate().toISOString()).toBe('2014-08-11T02:00:00.000Z');
        });

        it('should accept negative timestamp (before genesis block)', () => {
            const burstTime = BurstTime.fromBurstTimestamp(-1);
            expect(burstTime.getDate().toISOString()).toBe('2014-08-11T01:59:59.000Z');
        });
    });

    describe('fromDate', () => {
        it('should create correctly', () => {
            const burstTime = BurstTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(burstTime.getBurstTimestamp()).toBe(142850535);
            expect(burstTime.getDate().toISOString()).toBe('2019-02-19T10:42:15.000Z');
        });

        it('should set to genesis Date at timestamp 0', () => {
            const burstTime = BurstTime.fromDate(new Date('2014-08-11T02:00:00.000Z'));
            expect(burstTime.getBurstTimestamp()).toBe(0);
        });

        it('should accept date before genesis block', () => {
            const burstTime = BurstTime.fromDate(new Date('2014-08-11T01:59:59.000Z'));
            expect(burstTime.getBurstTimestamp()).toBe(-1);
        });
    });

    describe('setBurstTimestamp', () => {
        it('should set correctly', () => {
            const burstTime = BurstTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(burstTime.getBurstTimestamp()).toBe(142850535);
            burstTime.setBurstTimestamp(0);
            expect(burstTime.getDate().toISOString()).toBe('2014-08-11T02:00:00.000Z');
        });
    });

    describe('setDate', () => {
        it('should set correctly', () => {
            const burstTime = BurstTime.fromBurstTimestamp(0);
            expect(burstTime.getBurstTimestamp()).toBe(0);
            burstTime.setDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(burstTime.getBurstTimestamp()).toBe(142850535);
        });
    });

    describe('getEpoch', () => {
        it('should return correct value', () => {
            const date = new Date('2019-02-19T10:42:15.000Z');
            const burstTime = BurstTime.fromDate(date);
            expect(burstTime.getEpoch()).toBe(date.getTime());
        });
    });

    describe('equals', () => {
        it('should be equal', () => {
            const burstTime1 = BurstTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            const burstTime2 = BurstTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(burstTime1.equals(burstTime2)).toBeTruthy();
        });
        it('should not be equal', () => {
            const burstTime1 = BurstTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            const burstTime2 = BurstTime.fromDate(new Date('2019-02-20T10:42:15.000Z'));
            expect(burstTime1.equals(burstTime2)).toBeFalsy();
        });
    });

    describe('after', () => {
        it('should be after', () => {
            const burstTime1 = BurstTime.fromDate(new Date('2019-02-20T10:42:15.000Z'));
            const burstTime2 = BurstTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(burstTime1.after(burstTime2)).toBeTruthy();
        });
        it('should not be after', () => {
            const burstTime1 = BurstTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            const burstTime2 = BurstTime.fromDate(new Date('2019-02-20T10:42:15.000Z'));
            expect(burstTime1.after(burstTime2)).toBeFalsy();
        });
        it('should not be before for equal burst times', () => {
            const burstTime1 = BurstTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            const burstTime2 = BurstTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(burstTime1.after(burstTime2)).toBeFalsy();
        });
    });

    describe('before', () => {
        it('should be before', () => {
            const burstTime1 = BurstTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            const burstTime2 = BurstTime.fromDate(new Date('2019-02-20T10:42:15.000Z'));
            expect(burstTime1.before(burstTime2)).toBeTruthy();
        });
        it('should not be before', () => {
            const burstTime1 = BurstTime.fromDate(new Date('2019-02-20T10:42:15.000Z'));
            const burstTime2 = BurstTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(burstTime1.before(burstTime2)).toBeFalsy();
        });
        it('should not be before for equal burst times', () => {
            const burstTime1 = BurstTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            const burstTime2 = BurstTime.fromDate(new Date('2019-02-19T10:42:15.000Z'));
            expect(burstTime1.before(burstTime2)).toBeFalsy();
        });
    });

});
