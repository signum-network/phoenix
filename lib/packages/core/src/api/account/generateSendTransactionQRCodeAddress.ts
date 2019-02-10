/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../burstService';

/**
 * Generate the URL for a QR Code for a given BURST address
 * @param {string} address The recipient burst address
 * @return {string}
 */
export const generateSendTransactionQRCodeAddress = (service: BurstService):
    (
        address: string
    ) => string =>
    (
        address: string
    ): string =>
        service.toBRSEndpoint('generateSendTransactionQRCode', {
            receiverId: address,
            amountNQT: 0,
            feeSuggestionType: 'standard'
        });
