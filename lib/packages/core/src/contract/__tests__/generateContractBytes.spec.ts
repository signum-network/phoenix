import {generateContractBytes} from '../generateContractBytes';
import {convertHexEndianess, convertNumberToNQTString} from '@burstjs/util';
import {EchoContract} from './__mocks__/contracts.mock';
const minActivationFee = convertNumberToNQTString(30);

describe('generateContractBytes', () => {

    it('should generate bytes correctly - Big Endian Source', () => {
        const generated = generateContractBytes({
            hexCode: convertHexEndianess(EchoContract.hexCodeLE),
            activationFeePlanck: minActivationFee,
            isLittleEndian: false,
        });
        expect(new Int8Array(generated)).toEqual(EchoContract.expected);
    });

    it('should generate bytes correctly - Little Endian Source', () => {
        const generated = generateContractBytes({
            hexCode: EchoContract.hexCodeLE,
            activationFeePlanck: minActivationFee,
        });
        expect(new Int8Array(generated)).toEqual(EchoContract.expected);
    });

});
