/** @module core.api.factories */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {ServerStatus} from '../../../typings/serverStatus';

/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getServerStatus]]
 */
export const getServerStatus = (service: BurstService): () => Promise<ServerStatus> =>
    (): Promise<ServerStatus> => service.query('getState');
