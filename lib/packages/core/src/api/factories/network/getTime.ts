/** @ignore */
/** @module core */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../burstService';
import {BurstTime} from '../../../typings/burstTime';

export const getTime = (service: BurstService): () => Promise<BurstTime> =>
    async (): Promise<BurstTime> => await service.query('getTime');

