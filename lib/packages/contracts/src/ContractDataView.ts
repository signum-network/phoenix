/** @module contracts */

/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {convertHexStringToDecString, convertHexStringToString} from '@burstjs/util';
import {Contract} from './typings/contract';
import {getContractDatablock} from './getContractDatablock';
import {CodePageSize} from './constants';
import {countCodePages} from './countCodePages';

/**
 * Helper class for contracts
 *
 * A contract owns additional data, which is split in 8 byte blocks.
 * The content is encoded in hexadecimal representation and big endianness.
 * This class facilitates access to these data
 */
export class ContractDataView {

    private static VariableLength = 16;

    constructor(private _contract: Contract) {
    }

    /**
     * @return Get the contract
     */
    getContract() {
        return this._contract;
    }

    /**
     * @return The number of code pages
     */
    countCodePages() {
        return countCodePages(this._contract.machineCode);
    }

    /**
     * Get a variable as string
     * @param index The index of variable (starting at 0)
     * @return The data as string (Utf-8)
     */
    public getVariableAsString(index: number): string {
        const hexData = this.getHexDataAt(index, ContractDataView.VariableLength);
        return convertHexStringToString(hexData.replace(/00/g, ''));
    }

    /**
     * Get multiple data blocks as string
     * @param index The index of variable (starting at 0)
     * @param count Number of blocks
     * @return The data as string (Utf-8)
     */
    public getDataBlocksAsString(index: number, count?: number): string {
        const hexData = this.getHexDataAt(index, count * ContractDataView.VariableLength);
        return convertHexStringToString(hexData.replace(/00/g, ''));
    }

    /**
     * Get a variable as decimal (string)
     * @param index The index of variable (starting at 0)
     * @return The data as a decimal string sequence
     */
    public getVariableAsDecimal(index: number): string {
        return convertHexStringToDecString(this.getVariable(index));
    }

    /**
     * Get a variable at given position/index
     * @param index The index of variable (starting at 0)
     * @return The data as hexadecimal string (in little endianness)
     */
    public getVariable(index: number): string {
        return this.getHexDataAt(index, ContractDataView.VariableLength);
    }

    /**
     * Get a hexadecimal data block of arbitrary length at given position/index
     * @param index The index of variable (starting at 0)
     * @param length The length of the data block (must be a multiple of 2)
     * @return The data as hexadecimal string (in little endianness)
     */
    public getHexDataAt(index: number, length?: number): string {
        const l = length ? length : this._contract.machineData.length - ContractDataView.VariableLength * index;
        return getContractDatablock(this._contract, index, l);
    }

}
