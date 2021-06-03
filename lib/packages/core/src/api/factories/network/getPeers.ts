/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { ChainService } from '../../../service/chainService';
import { PeerAddressList } from '../../../typings/peerAddressList';

/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getPeers]]
 * @module core.api.factories
 */
export const getPeers = (service: ChainService):
    (active: boolean) => Promise<PeerAddressList> =>
    (active: boolean = true): Promise<PeerAddressList> =>
        service.query('getPeers', {
            active,
        });
