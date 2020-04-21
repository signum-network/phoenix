/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.generateSendTransactionQRCode]]
 *
 * @module core.api.factories
 */
export const generateSendTransactionQRCode = (service: BurstService):
    (
        receiverId: string,
        amountNQT?: number,
        feeSuggestionType?: string,
        feeNQT?: number,
        immutable?: boolean
    ) => Promise<ArrayBufferLike> =>
    (
        receiverId: string,
        amountNQT: number = 0,
        feeSuggestionType: string = 'standard',
        feeNQT: number,
        immutable: boolean
    ): Promise<ArrayBufferLike> =>
        service.query('generateSendTransactionQRCode', {
            receiverId,
            amountNQT,
            feeSuggestionType,
            feeNQT,
            immutable
        });
