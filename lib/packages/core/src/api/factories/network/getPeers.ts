/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import { PeerAddressList } from '../../../typings/peerAddressList';

/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getPeers]]
 * @module core.api.factories
 */
export const getPeers = (service: BurstService):
    (active: boolean) => Promise<PeerAddressList> =>
    (active: boolean = true): Promise<PeerAddressList> =>
        service.query('getPeers', {
            active,
        });
