/** @module core */

import {Contract} from './contract';

/**
 * Copyright (c) 2019 Burst Apps Team
 */

export interface ContractList {
    ats: Contract[];
    requestProcessingTime: number;
}
