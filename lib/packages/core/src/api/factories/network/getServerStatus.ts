/** @ignore */
/** @module core */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../burstService';
import {ServerStatus} from '../../../typings/serverStatus';

export const getServerStatus = (service: BurstService): () => Promise<ServerStatus> =>
    (): Promise<ServerStatus> => service.query('getState');
