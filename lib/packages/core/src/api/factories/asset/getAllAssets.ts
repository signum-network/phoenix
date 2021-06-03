/**
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service';
import {AssetList} from '../../../typings/assetList';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAllAssets]]
 * @module core.api.factories
 */
export const getAllAssets = (service: ChainService):
    (firstIndex?: number, lastIndex?: number) => Promise<AssetList> =>
    (firstIndex?: number, lastIndex?: number): Promise<AssetList> =>
        service.query('getAllAssets', {firstIndex, lastIndex});
