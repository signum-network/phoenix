import {calculateMinimumCreationFee} from '../calculateMinimumCreationFee';
import {convertNumberToNQTString} from '@burstjs/util';

describe('calculateMinimumCreationFee', () => {
    it('calculates minimum contract fee in planck - inactive CIP20', () => {
        expect(calculateMinimumCreationFee('xx'.repeat(513)).getBurst()).toBe('6');
        expect(calculateMinimumCreationFee('xx'.repeat(300)).getBurst()).toBe('5');
        expect(calculateMinimumCreationFee('xx'.repeat(1)).getBurst()).toBe('4');
    });

    it('calculates minimum contract fee in planck - active CIP20', () => {
        expect(calculateMinimumCreationFee('xx'.repeat(513), true).getBurst()).toBe('0.441');
        expect(calculateMinimumCreationFee('xx'.repeat(300), true).getBurst()).toBe('0.3675');
        expect(calculateMinimumCreationFee('xx'.repeat(1), true).getBurst()).toBe('0.294');
    });

});
