/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {ChainTimestamp} from '../../../typings/chainTimestamp';

/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getSuggestedFees]]
 * @module core.api.factories
 */
export const getTime = (service: ChainService): () => Promise<ChainTimestamp> =>
    async (): Promise<ChainTimestamp> => await service.query('getTime');

