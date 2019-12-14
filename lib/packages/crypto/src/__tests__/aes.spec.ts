import {encryptAES} from '../encryptAES';
import {decryptAES} from '../decryptAES';

describe('AES', () => {

    it('should encrypt/decrypt correctly', () => {

        const secret = 'secret';
        const Message = 'Test Message';

        const encrypted = encryptAES(Message, secret);
        const decrypted = decryptAES(encrypted, secret);
        expect(decrypted).toBe(Message);

    });

    it('should encrypt/decrypt correctly unicode', () => {

        const secret = 'secret';
        const Message = '\u01F6 with Unicode';

        const encrypted = encryptAES(Message, secret);
        const decrypted = decryptAES(encrypted, secret);
        expect(decrypted).toBe(Message);

    });

    it('should NOT encrypt/decrypt correctly', () => {

        const secret = 'secret';
        const Message = 'Test Message';

        const encrypted = encryptAES(Message, secret);
        const decrypted = decryptAES(encrypted, 'false secret');
        expect(decrypted).not.toBe(Message);

    });

});
