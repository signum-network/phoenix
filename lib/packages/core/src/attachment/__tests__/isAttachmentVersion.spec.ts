import {isAttachmentVersion} from '../isAttachmentVersion';

describe('isAttachmentVersion', () => {

    it('return true in case of correct version', () => {
        const transaction = {
            transaction: '123',
            attachment: {'version.CustomVersionId': 1, foo: 1}
        };

        const result = isAttachmentVersion(transaction, 'CustomVersionId');
        expect(result).toBeTruthy();

    });

    it('returns false in case of wrong version', () => {
        const transaction = {
            transaction: '123',
            attachment: {'version.CustomVersionId': 1, foo: 1}
        };

        const result = isAttachmentVersion(transaction, 'AnotherVersionId');
        expect(result).toBeFalsy();
    });

    it('returns false in case of not existing attachment', () => {
        const transaction = {
            transaction: '123'
        };
        const result = isAttachmentVersion(transaction, 'AnotherVersionId');
        expect(result).toBeFalsy();
    });

    it('does throw error in case of not existing version', () => {
        const transaction = {
            transaction: '123',
            attachment: {foo: 123}
        };
        const result = isAttachmentVersion(transaction, 'AnotherVersionId');
        expect(result).toBeFalsy();
    });
});
