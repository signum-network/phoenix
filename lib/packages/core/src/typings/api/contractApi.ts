import {Contract} from '../contract';
import {ContractList} from '../contractList';
import {ContractIdList} from '../contractIdList';
import {PublishContractArgs} from '../args';
import {TransactionId} from '../transactionId';
import {CallContractMethodArgs} from '../args/callContractMethodArgs';

/**
 * Contract API
 *
 * This module provides methods about the smart contracts
 *
 * @module core.api
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


    /**
     * Get all contract Ids of the blockchain
     * @return {ContractIdList} The list of contract ids
     */
    getAllContractIds: (id: string) => Promise<ContractIdList>;


    /**
     * Publishes a smart contract to the blockchain
     * @param args {PublishContractArgs} The argument object
     * @return {TransactionId} The transaction id in case of success
     */
    publishContract: (args: PublishContractArgs) => Promise<TransactionId>;

    /**
     * Calls a public method of smart contract
     * @param args {CallContractMethodArgs} The argument object
     * @return {TransactionId} The transaction id in case of success
     */
    callContractMethod: (args: CallContractMethodArgs) => Promise<TransactionId>;

}
