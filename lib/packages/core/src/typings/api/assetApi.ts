import {Asset} from '../asset';
import {AssetList} from '../assetList';

/**
 * Asset API
 *
 * Work in progress
 *
 * @module core.api
 * */
export interface AssetApi {

    /**
     * Get asset information by its id
     * @param {string} assetId The asset id
     * @return {Promise<Asset>} The asset, if exists
     */
    getAsset: (
        assetId: string,
    ) => Promise<Asset>;


    /**
     * Get all available assets
     * @param {number?} firstIndex The first index of range to be returned (begins with 0)
     * @param {number?} lastIndex The first index of range to be returned (max is 500)
     * @return {Promise<Asset>} List of assets
     */
    getAllAssets: (
        firstIndex?: number,
        lastIndex?: number,
    ) => Promise<AssetList>;

}
