/** @ignore */
/** @module core */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../burstService';
import { PeersResponse } from '../../../typings/peersResponse';

export const getPeers = (service: BurstService):
    (active: boolean) => Promise<PeersResponse> =>
    (active: boolean = true): Promise<PeersResponse> =>
        service.query('getPeers', {
            active,
        });
