import {constructAttachment, Transaction} from '..';


describe('constructAttachment', () => {

    it('should construct message attachment', () => {

        const transaction: Transaction = {
            attachment: {
                type: 'message',
                messageIsText: true,
                message: 'message'
            }
        };

        const attachment = constructAttachment(transaction, {foo: 'bar'});
        expect(attachment).toEqual(
            {message: 'message', messageIsText: 'true', foo: 'bar'}
        );

    });

    it('should construct encrypted message attachment', () => {

        const transaction: Transaction = {
            attachment: {
                type: 'encrypted_message',
                isText: true,
                nonce: 'nonce',
                data: 'data',
            }
        };

        const attachment = constructAttachment(transaction, {foo: 'bar'});
        expect(attachment).toEqual(
            {
                encryptedMessageData: 'data',
                encryptedMessageNonce: 'nonce',
                messageToEncryptIsText: 'true',
                foo: 'bar',
            }
        );

    });

});
