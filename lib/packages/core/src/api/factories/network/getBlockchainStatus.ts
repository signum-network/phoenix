/** @ignore */
/** @module core */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../burstService';
import {BlockchainStatus} from '../../../typings/blockchainStatus';
import { ApiError } from '../../../typings/api/apiError';

export const getBlockchainStatus = (service: BurstService): () => Promise<BlockchainStatus | ApiError> =>
    (): Promise<BlockchainStatus | ApiError> => service.query('getBlockchainStatus');
