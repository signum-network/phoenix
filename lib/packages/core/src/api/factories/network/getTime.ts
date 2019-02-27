/** @ignore */
/** @module core */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../burstService';
import {BlockchainTime} from '../../../typings/blockchainTime';

export const getTime = (service: BurstService): () => Promise<BlockchainTime> =>
    async (): Promise<BlockchainTime> => {
        const {time} = await service.query('getTime');
        return Promise.resolve({
            time,
            unixTime: Math.floor((Date.now() / 1000))
        });
    };
