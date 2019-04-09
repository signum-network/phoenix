/** @module core.api.factories */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {BurstTime} from '../../../typings/burstTime';

/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.suggestFee]]
 */
export const getTime = (service: BurstService): () => Promise<BurstTime> =>
    async (): Promise<BurstTime> => await service.query('getTime');

