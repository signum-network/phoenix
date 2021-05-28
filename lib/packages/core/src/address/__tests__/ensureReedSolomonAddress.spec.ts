import {ensureReedSolomonAddress} from '../ensureReedSolomonAddress';

describe('ensureReedSolomonAddress', () => {

    it('should accept correct addresses', () => {
        expect(() => ensureReedSolomonAddress('PREFIX_A-K37B-9V85-FB95-793HN')).not.toThrow();
        expect(() => ensureReedSolomonAddress('PREFIX_B-K37B-9V85-FB95-793HN')).not.toThrow();
    });

    it('should throw on invalid addresses', () => {
        expect(() => ensureReedSolomonAddress(null)).toThrow();
        expect(() => ensureReedSolomonAddress('')).toThrow();
        expect(() => ensureReedSolomonAddress('K37B-9V85-FB95-793HP')).toThrow();
        expect(() => ensureReedSolomonAddress('PREFIX-K37B-9V85-FB95-793HP')).toThrow();
    });
});
