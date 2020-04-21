/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {BlockchainStatus} from '../../../typings/blockchainStatus';


/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getBlockchainStatus]]
 * @module core.api.factories
 */
export const getBlockchainStatus = (service: BurstService): () => Promise<BlockchainStatus> =>
    (): Promise<BlockchainStatus> => service.query('getBlockchainStatus');
