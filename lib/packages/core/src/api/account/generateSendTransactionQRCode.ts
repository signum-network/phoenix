/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../burstService';

/**
 * Get QR Code image for a given BURST address
 * @param {string} receiverId The recipient burst 
 * @param {string} amountNQT The amount (in NQT) to request 
 * @param {string} feeSuggestionType The fee suggestion type string
 * @return {Promise<ArrayBufferLike>}
 */
export const generateSendTransactionQRCode = (service: BurstService):
    (
        receiverId: string,
        amountNQT?: number,
        feeSuggestionType?: string
    ) => Promise<ArrayBufferLike> =>
    (
        receiverId: string,
        amountNQT: number = 0,
        feeSuggestionType: string = 'standard'
    ): Promise<ArrayBufferLike> =>
        service.query('generateSendTransactionQRCode', {
            receiverId,
            amountNQT,
            feeSuggestionType
        });
