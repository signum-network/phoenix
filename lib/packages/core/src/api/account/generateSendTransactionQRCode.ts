/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../burstService';

/**
 * Get QR Code for a given BURST address
 * @param {string} address The recipient burst address
 * @return {Promise<ArrayBufferLike>}
 */
export const generateSendTransactionQRCode = (service: BurstService):
    (
        address: string
    ) => Promise<ArrayBufferLike> =>
    (
        address: string
    ): Promise<ArrayBufferLike> =>
        service.query('generateSendTransactionQRCode', {
            receiverId: address,
            amountNQT: 0,
            feeSuggestionType: 'standard'
        });
