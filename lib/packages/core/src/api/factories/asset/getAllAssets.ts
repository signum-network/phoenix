/** @module core.api.factories */

/**
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service';
import {AssetList} from '../../../typings/assetList';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAllAssets]]
 */
export const getAllAssets = (service: BurstService):
    (firstIndex?: number, lastIndex?: number) => Promise<AssetList> =>
    (firstIndex?: number, lastIndex?: number): Promise<AssetList> =>
        service.query('getAllAssets', {firstIndex, lastIndex});
