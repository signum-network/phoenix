import {calculateMinimumCreationFee} from '../calculateMinimumCreationFee';
import {convertNumberToNQTString} from '@burstjs/util';

describe('calculateMinimumCreationFee', () => {
    it('calculates minimum contract fee in planck', () => {
        expect(calculateMinimumCreationFee('xx'.repeat(513))).toBe(convertNumberToNQTString(6));
        expect(calculateMinimumCreationFee('xx'.repeat(300))).toBe(convertNumberToNQTString(5));
        expect(calculateMinimumCreationFee('xx'.repeat(1))).toBe(convertNumberToNQTString(4));
    });
});
