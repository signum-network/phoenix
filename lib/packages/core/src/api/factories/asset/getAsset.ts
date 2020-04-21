/**
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {Asset} from '../../../typings/asset';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAsset]]
 * @module core.api.factories
 * */
export const getAsset = (service: BurstService):
    (assetId: string) => Promise<Asset> =>
    (assetId: string): Promise<Asset> =>
        service.query('getAsset', {asset: assetId});
