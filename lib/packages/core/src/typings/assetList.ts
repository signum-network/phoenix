/** @module core */

import {Asset} from './asset';

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

export interface AssetList {
    assets: Asset[];
    requestProcessingTime: number;
}
