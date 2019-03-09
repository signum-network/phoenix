/** @ignore */
/** @module core */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../burstService';
import { PeerAddressList } from '../../../typings/peerAddressList';

export const getPeers = (service: BurstService):
    (active: boolean) => Promise<PeerAddressList> =>
    (active: boolean = true): Promise<PeerAddressList> =>
        service.query('getPeers', {
            active,
        });
