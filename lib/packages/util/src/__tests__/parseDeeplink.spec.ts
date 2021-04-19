import {parseDeeplink} from '../parseDeeplink';

describe('parseDeeplink', () => {
    it('should parse a deeplink without action and payload', () => {
        expect(parseDeeplink('burst.testdomain://v1')).toEqual({
            domain: 'testdomain',
            version: 'v1',
            action: undefined,
            payload: undefined,
        });
    });

    it('should parse a deeplink without domain', () => {
        expect(parseDeeplink('burst://v1')).toEqual({
            domain: undefined,
            version: 'v1',
            action: undefined,
            payload: undefined,
        });
    });

    it('should parse a deeplink with action but without payload', () => {
        expect(parseDeeplink('burst.testdomain://v1?action=testAction')).toEqual({
            domain: 'testdomain',
            version: 'v1',
            action: 'testAction',
            payload: undefined,
        });
    });

    it('should parse a deeplink with action and payload - unencoded', () => {
        expect(parseDeeplink('burst.testdomain://v1?action=testAction&payload=testPayload')).toEqual({
            domain: 'testdomain',
            version: 'v1',
            action: 'testAction',
            payload: 'testPayload',
        });
    });

    it('should parse a deeplink with action and payload - hex Encoded', () => {
        expect(parseDeeplink('burst.testdomain://v1?action=testAction&payload=7b22666f6f223a22626172f09f9880222c22626172223a5b312c322c335d7d')).toEqual({
            domain: 'testdomain',
            version: 'v1',
            action: 'testAction',
            payload: '7b22666f6f223a22626172f09f9880222c22626172223a5b312c322c335d7d',
        });
    });

    it('should parse a deeplink with action and payload - base64 Encoded', () => {
        expect(parseDeeplink('burst.testdomain://v1?action=testAction&payload=eyJmb28iOiJiYXLwn5iAIiwiYmFyIjpbMSwyLDNdfQ')).toEqual({
            domain: 'testdomain',
            version: 'v1',
            action: 'testAction',
            payload: 'eyJmb28iOiJiYXLwn5iAIiwiYmFyIjpbMSwyLDNdfQ',
        });
    });


    describe('parseDeeplink Errors', () => {
        it('should throw exception if deeplink is not compatible #1', () => {
            try {
                parseDeeplink('http://bla.com');
                expect('Expect an exception').toBeFalsy();
            } catch (e) {
                expect(e.message).toContain('Invalid deeplink');
            }
        });
        it('should throw exception if deeplink is not compatible #2', () => {
            try {
                parseDeeplink('burst.testdomain://wrongformat');
                expect('Expect an exception').toBeFalsy();
            } catch (e) {
                expect(e.message).toContain('Invalid deeplink');
            }
        });
        it('should throw exception if deeplink is not compatible #3', () => {
            try {
                parseDeeplink('burst.testdomain://v1?unknown=123');
                expect('Expect an exception').toBeFalsy();
            } catch (e) {
                expect(e.message).toContain('Invalid deeplink');
            }
        });
    });
});
