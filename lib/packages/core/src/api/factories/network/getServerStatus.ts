/** @ignore */
/** @module core */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../burstService';
import {ServerStatus} from '../../../typings/serverStatus';
import { ApiError } from '../../../typings/api/apiError';

export const getServerStatus = (service: BurstService): () => Promise<ServerStatus | ApiError> =>
    (): Promise<ServerStatus | ApiError> => service.query('getState');
