/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {BlockId} from '../../..';

/**
 * Use with [[ApiComposer]] and belongs to [[BlockApi]].
 *
 * See details at [[BlockApi.getBlockId]]
 * @module core.api.factories
 */
export const getBlockId = (service: BurstService):
    (height: number) => Promise<BlockId> =>
    (height: number): Promise<BlockId> =>
        service.query('getBlockId', {
            height,
        });
