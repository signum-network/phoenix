/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {MiningInfo} from '../../../typings/miningInfo';


/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getMiningInfo]]
 * @module core.api.factories
 */
export const getMiningInfo = (service: BurstService): () => Promise<MiningInfo> =>
    (): Promise<MiningInfo> => service.query('getMiningInfo');
