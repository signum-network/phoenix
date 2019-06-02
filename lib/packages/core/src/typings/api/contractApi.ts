/** @module core.api */

import {Contract} from '../contract';

/**
 * Contract API
 *
 * This module provides methods about the smart contracts
 */
export interface ContractApi {
    /**
     * Get a contract by its Id
     * @param id The ID of the contract
     * @return {Contract} The contract
     */
    getContract: (id: string) => Promise<Contract>;

}
