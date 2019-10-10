/** @module core.api */

import {Asset} from '../asset';

/**
 * Asset API
 *
 * Work in progress
 * */
export interface AssetApi {

    /**
     * Get asset information by its id
     * @param {string} assetId The asset id
     * @return {Promise<Asset>} List of transactions
     */
    getAsset: (
        assetId: string,
    ) => Promise<Asset>;

}
