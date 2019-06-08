/** @module core.api */

import {Contract} from '../contract';
import {ContractList} from '../contractList';

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

    /**
     * Get all contracts of given account
     * @param accountId The account id (not RS address)
     * @returns {ContractList} A list of contracts
     */
    getContractsByAccount: (accountId: string) => Promise<ContractList>;

}
