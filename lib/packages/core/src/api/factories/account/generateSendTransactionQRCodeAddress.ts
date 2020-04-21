/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.generateSendTransactionQRCodeAddress]]
 *
 * @module core.api.factories
 */
export const generateSendTransactionQRCodeAddress = (service: BurstService):
    (
        receiverId: string,
        amountNQT?: number,
        feeSuggestionType?: string,
        feeNQT?: number,
        immutable?: boolean
    ) => Promise<string> =>
    (
        receiverId: string,
        amountNQT: number = 0,
        feeSuggestionType: string = 'standard',
        feeNQT: number,
        immutable
    ): Promise<string> =>
        Promise.resolve(
            service.toBRSEndpoint('generateSendTransactionQRCode', {
                    receiverId: receiverId,
                    amountNQT,
                    feeSuggestionType,
                    feeNQT,
                    immutable
                }
            )
        );
