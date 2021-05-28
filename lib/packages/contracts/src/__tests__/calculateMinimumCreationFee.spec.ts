import {calculateMinimumCreationFee} from '../calculateMinimumCreationFee';

describe('calculateMinimumCreationFee', () => {
    it('calculates minimum contract fee in planck - inactive CIP20', () => {
        expect(calculateMinimumCreationFee('xx'.repeat(513)).getSigna()).toBe('6');
        expect(calculateMinimumCreationFee('xx'.repeat(300)).getSigna()).toBe('5');
        expect(calculateMinimumCreationFee('xx'.repeat(1)).getSigna()).toBe('4');
    });

    it('calculates minimum contract fee in planck - active CIP20', () => {
        expect(calculateMinimumCreationFee('xx'.repeat(513), true).getSigna()).toBe('0.441');
        expect(calculateMinimumCreationFee('xx'.repeat(300), true).getSigna()).toBe('0.3675');
        expect(calculateMinimumCreationFee('xx'.repeat(1), true).getSigna()).toBe('0.294');
    });
});
