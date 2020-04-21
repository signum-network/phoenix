import {Contract} from './contract';

/**
 * Copyright (c) 2019 Burst Apps Team
 */

/**
 * The Contract Id List
 * @module core
 */
export interface ContractList {
    ats: Contract[];
    requestProcessingTime: number;
}
