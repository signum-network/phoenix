import {Converter} from '../converter';

describe('Converter', () => {

    describe('base64', () => {
        it('should convert text to base64', () => {
            expect(Converter.convertStringToBase64('Test')).toBe('VGVzdA==');
        });
        it('should convert empty text to empty base64', () => {
            expect(Converter.convertStringToBase64('')).toBe('');
        });
        it('should convert base64 to text', () => {
            expect(Converter.convertBase64ToString('VGVzdA==')).toBe('Test');
        });
        it('should convert empty base64 to empty text', () => {
            expect(Converter.convertBase64ToString('')).toBe('');
        });
    });


});
