/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {BurstTime} from '../../../typings/burstTime';

/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getSuggestedFees]]
 * @module core.api.factories
 */
export const getTime = (service: ChainService): () => Promise<BurstTime> =>
    async (): Promise<BurstTime> => await service.query('getTime');

