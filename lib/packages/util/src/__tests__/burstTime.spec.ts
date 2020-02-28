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

        it('should accept negative timestampe (before genesis block)', () => {
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

    // TODO: more tests

});
