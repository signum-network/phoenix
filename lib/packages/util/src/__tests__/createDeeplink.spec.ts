import {createDeeplink} from '../createDeeplink';
import {EncoderFormat} from '../typings';

describe('createDeeplink', () => {
    it('should create a deeplink without action and payload', () => {
        const expected = 'burst.testdomain://v1';
        expect(createDeeplink({
            domain: 'testdomain'
        })).toBe(expected);
    });

    it('should', () => {
        const expected = 'burst.testdomain://v1';
        const payload = {
            'recipient': 'BURST-9K9L-4CB5-88Y5-F5G4Z',
            'amountPlanck': 10000000,
            'feePlanck': 735000,
            'message': 'Hi, from a deep link',
            'messageIsText': true,
            'immutable': true,
            'deadline': 24,
            'encrypt': false
        };

        const deeplink = createDeeplink({
            action: 'pay',
            payload
        });
        const x = deeplink;
    });

    it('should create a deeplink with action but without payload', () => {
        const expected = 'burst.testdomain://v1?action=testAction';
        expect(createDeeplink({
            domain: 'testdomain',
            action: 'testAction',
        })).toBe(expected);
    });

    it('should create a deeplink with action and payload - unencoded', () => {
        const expected = 'burst.testdomain://v1?action=testAction&payload=testPayload';
        expect(createDeeplink({
            domain: 'testdomain',
            action: 'testAction',
            payload: 'testPayload',
            encoderFormat: EncoderFormat.Text
        })).toBe(expected);
    });

    it('should create a deeplink with action and payload - but no domain', () => {
        const expected = 'burst://v1?action=testAction&payload=testPayload';
        expect(createDeeplink({
            action: 'testAction',
            payload: 'testPayload',
            encoderFormat: EncoderFormat.Text
        })).toBe(expected);
    });

    it('should create a deeplink with action and payload - hex Encoded', () => {
        const expected = 'burst.testdomain://v1?action=testAction&payload=7b22666f6f223a22626172f09f9880222c22626172223a5b312c322c335d7d';
        expect(createDeeplink({
            domain: 'testdomain',
            action: 'testAction',
            payload: {
                foo: 'bar😀', // unicode
                bar: [1, 2, 3]
            },
            encoderFormat: EncoderFormat.Hexadecimal
        })).toBe(expected);
    });

    it('should create a deeplink with action and payload - base64 Encoded', () => {
        const expected = 'burst.testdomain://v1?action=testAction&payload=eyJmb28iOiJiYXLwn5iAIiwiYmFyIjpbMSwyLDNdfQ';
        expect(createDeeplink({
            domain: 'testdomain',
            action: 'testAction',
            payload: {
                foo: 'bar😀', // unicode
                bar: [1, 2, 3]
            },
            // base64 is default
        })).toBe(expected);
    });

});
