import {generateMethodCall} from '../generateMethodCall';

const ContractMethodHash = '-8011735560658290665';

describe('generateMethodCall', () => {
    it('generates a method call without argument', () => {
        const message = generateMethodCall({
            methodHash: ContractMethodHash
        });
        expect(message).toBe('17f898a0f498d090');
    });

    it('generates a method call with three arguments', () => {
        const message = generateMethodCall({
            methodHash: ContractMethodHash,
            methodArgs: [true, 1234, '1234567890'],
        });
        expect(message).toBe('17f898a0f498d0900100000000000000d204000000000000d202964900000000');
    });
});
