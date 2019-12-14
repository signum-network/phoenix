import {countCodePages} from '../countCodePages';

describe('countCodePage', () => {
    it('counts pages as expected', () => {
        expect(countCodePages('xx'.repeat(513))).toBe(3);
        expect(countCodePages('xx'.repeat(300))).toBe(2);
        expect(countCodePages('xx'.repeat(1))).toBe(1);
    });
});
