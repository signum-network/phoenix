/** @module contracts */
import {GenerateContractArgs} from './typings/args';
import {generateContractBytes} from './internal/generateContractBytes';
import {convertByteArrayToHexString} from '@burstjs/util';

export const generateContract = (args: GenerateContractArgs): string => {
    const bytes = generateContractBytes(args);
    return convertByteArrayToHexString(new Uint8Array(bytes));
};
