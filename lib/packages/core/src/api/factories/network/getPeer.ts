/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { ChainService } from '../../../service/chainService';
import { Peer } from '../../../typings/peer';

/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getPeer]]
 * @module core.api.factories
 */
export const getPeer = (service: ChainService):
    (peer: string) => Promise<Peer> =>
    (peer: string): Promise<Peer> =>
        service.query('getPeer', {
            peer,
        });
