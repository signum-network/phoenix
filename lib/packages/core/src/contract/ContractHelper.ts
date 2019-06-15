import {Contract} from '../typings/contract';
import {getContractDatablock} from './index';
import {convertHexStringToDec, convertHexStringToString} from '../../../util/src';

/**
 * Helper class for contracts
 */
export class ContractHelper {

    public static VARIABLE_LENGTH = 16;

    constructor(private _contract: Contract) {

    }

    /**
     * @return Gets the contract
     */
    get contract() { return this._contract; }

    /**
     * Gets a variable as string
     * @param index The index of variable (starting at 0)
     * @return The data as string (Utf-8)
     */
    public getVariableAsString(index: number): string {
        return convertHexStringToString(this.getVariable(index));
    }

    /**
     * Gets a variable as decimal (string)
     * @param index The index of variable (starting at 0)
     * @return The data as a decimal string sequence
     */
    public getVariableAsDecimal(index: number): string {
        return convertHexStringToDec(this.getVariable(index));
    }

    /**
     * Gets a variable at given position/index
     * @param index The index of variable (starting at 0)
     * @return The data as hexadecimal string (in little endianness)
     */
    public getVariable(index: number): string {
        return this.getHexDataAt(index, ContractHelper.VARIABLE_LENGTH);
    }

    /**
     * Gets a hexadecimal data block of arbitrary length at given position/index
     * @param index The index of variable (starting at 0)
     * @param length The length of the data block (must be a multiple of 2)
     * @return The data as hexadecimal string (in little endianness)
     */
    public getHexDataAt(index: number, length: number): string {
        return getContractDatablock(this.contract, index, length);
    }

}
