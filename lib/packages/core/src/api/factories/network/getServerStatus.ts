/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {ServerStatus} from '../../../typings/serverStatus';

/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getServerStatus]]
 * @module core.api.factories
 */
export const getServerStatus = (service: ChainService): () => Promise<ServerStatus> =>
    (): Promise<ServerStatus> => service.query('getState');
