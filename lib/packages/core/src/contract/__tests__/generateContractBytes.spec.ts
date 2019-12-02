import {generateContractBytes} from '../generateContractBytes';
import {convertHexEndianess, convertNumberToNQTString} from '@burstjs/util';
import {EchoContract, AppRegistryContract, UniqueTokenContract} from './__mocks__/contracts.mock';
const minActivationFee = convertNumberToNQTString(30);

describe('generateContractBytes', () => {

    it('should generate bytes correctly - Big Endian Source - ECHO', () => {
        const generated = generateContractBytes({
            hexCode: convertHexEndianess(EchoContract.hexCodeLE),
            activationFeePlanck: minActivationFee,
            isLittleEndian: false,
        });
        expect(new Int8Array(generated)).toEqual(EchoContract.expected);
    });

    it('should generate bytes correctly - Big Endian Source - APPREGISTRY', () => {
        const generated = generateContractBytes({
            hexCode: convertHexEndianess(AppRegistryContract.hexCodeLE),
            activationFeePlanck: minActivationFee,
            isLittleEndian: false,
        });
        expect(new Int8Array(generated)).toEqual(AppRegistryContract.expected);
    });

    it('should generate bytes correctly - Big Endian Source - UNIQUETOKEN', () => {
        const generated = generateContractBytes({
            hexCode: convertHexEndianess(UniqueTokenContract.hexCodeLE),
            activationFeePlanck: minActivationFee,
            isLittleEndian: false,
        });
        expect(new Int8Array(generated)).toEqual(UniqueTokenContract.expected);
    });

    it('should generate bytes correctly - Little Endian Source - ECHO', () => {
        const generated = generateContractBytes({
            hexCode: EchoContract.hexCodeLE,
            activationFeePlanck: minActivationFee,
        });
        expect(new Int8Array(generated)).toEqual(EchoContract.expected);
    });

});
