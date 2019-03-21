import {assertAttachmentVersion} from '../assertAttachmentVersion';

describe('assertAttachmentVersion', () => {

    it('does not throw error in case of correct version', () => {
        const transaction = {
            transaction: '123',
            attachment : { 'version.CustomVersionId' : 1, foo: 1 }
        };

        assertAttachmentVersion(transaction, 'CustomVersionId');
        expect(true).toBeTruthy();

    });

    it('does throw error in case of wrong version', () => {
        try {
            const transaction = {
                transaction: '123',
                attachment : { 'version.CustomVersionId' : 1, foo: 1 }
            };

            assertAttachmentVersion(transaction, 'AnotherVersionId');
            expect(false).toEqual('Expected exception!');
        } catch (e) {
            expect(e.message).toContain('Attachment of Transaction 123 is not of version \'AnotherVersionId\'');
        }
    });

    it('does throw error in case of not existing attachment', () => {
        try {
            const transaction = {
                transaction: '123'
            };

            assertAttachmentVersion(transaction, 'AnotherVersionId');
            expect(false).toEqual('Expected exception!');
        } catch (e) {
            expect(e.message).toContain('Attachment of Transaction 123 is not of version \'AnotherVersionId\'');
        }
    });

    it('does throw error in case of not existing version', () => {

        try {
            const transaction = {
                transaction: '123',
                attachment: {foo: 123}
            };

            assertAttachmentVersion(transaction, 'AnotherVersionId');
            expect(false).toEqual('Expected exception!');
        } catch (e) {
            expect(e.message).toContain('Attachment of Transaction 123 is not of version \'AnotherVersionId\'');
        }
    });
});
