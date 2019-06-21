import {getAttachmentVersion} from '../getAttachmentVersion';
describe('getAttachmentVersion', () => {

    it('return the correct version string', () => {
        const transaction = {
            transaction: '123',
            attachment: {'version.CustomVersionId': 1, foo: 1}
        };

        const result = getAttachmentVersion(transaction);
        expect(result).toBe('CustomVersionId');

    });

    it('returns undefined in case of not existing attachment', () => {
        const transaction = {
            transaction: '123'
        };
        const result = getAttachmentVersion(transaction);
        expect(result).not.toBeDefined();
    });

    it('return undefined in case of not existing version', () => {
        const transaction = {
            transaction: '123',
            attachment: {foo: 123}
        };
        const result = getAttachmentVersion(transaction);
        expect(result).not.toBeDefined();
    });
});
