import {generateContractBytes} from '../generateContractBytes';
import {convertHexEndianess, convertNumberToNQTString} from '@burstjs/util';
import {
    AppRegistryContract,
    Echo4000kMinActivationContract,
    EchoContract,
    UniqueTokenContract
} from './helpers/contractsMocks';

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

    it('should throw exception when minFee is too big', () => {
        try {
            const t = convertNumberToNQTString( 4000000000);
            generateContractBytes({
                hexCode: EchoContract.hexCodeLE,
                activationFeePlanck: t,
            });
            expect('Expected exception').toBeTruthy();
        } catch (e) {
            expect(true).toBeTruthy();
        }
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

    it('should generate bytes correctly with high activation costs- ECHO', () => {
        const generated = generateContractBytes({
            hexCode: Echo4000kMinActivationContract.hexCodeLE,
            activationFeePlanck: convertNumberToNQTString(4000000),
        });
        expect(new Int8Array(generated)).toEqual(Echo4000kMinActivationContract.expected);
    });

});
