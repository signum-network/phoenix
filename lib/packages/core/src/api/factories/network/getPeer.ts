/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import { Peer } from '../../../typings/peer';

/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getPeer]]
 */
export const getPeer = (service: BurstService):
    (peer: string) => Promise<Peer> =>
    (peer: string): Promise<Peer> =>
        service.query('getPeer', {
            peer,
        });
