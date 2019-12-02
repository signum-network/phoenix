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

    it('should generate bytes correctly - APPREGISTRY', () => {
        const generated = generateContractBytes({
            hexCode: AppRegistryContract.hexCodeLE,
            activationFeePlanck: minActivationFee,
        });
        expect(new Int8Array(generated)).toEqual(AppRegistryContract.expected);
    });

    it('should generate bytes correctly - UNIQUETOKEN', () => {
        const generated = generateContractBytes({
            hexCode: UniqueTokenContract.hexCodeLE,
            activationFeePlanck: minActivationFee,
        });
        expect(new Int8Array(generated)).toEqual(UniqueTokenContract.expected);
    });

    it('should generate bytes correctly - ECHO', () => {
        const generated = generateContractBytes({
            hexCode: EchoContract.hexCodeLE,
            activationFeePlanck: minActivationFee,
        });
        expect(new Int8Array(generated)).toEqual(EchoContract.expected);
    });

});
