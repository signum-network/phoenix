import {getDeeplinkInfo, SendPayload} from '../deeplink';
import {createDeeplink, Amount} from '@signumjs/util';

describe('deeplink', () => {
    describe('legacy', () => {
        it('it should create expected payload', () => {
            expect(true).toBeTruthy();
        });
    });
    describe('cip22', () => {
        it('it should create expected payload - all params', () => {
            const payload: SendPayload = {
                recipient: 'recipientsAddress',
                amountPlanck: Amount.fromSigna(100).getPlanck(),
                feePlanck: Amount.fromSigna(0.00735).getPlanck(),
                message: 'Test Message',
                messageIsText: true,
                encrypt: true,
                immutable: true,
            };

            const cip22Link = createDeeplink({
                action: 'pay',
                payload,
            });

            const info = getDeeplinkInfo(cip22Link);
            const data = info.decodedPayload as SendPayload;

            expect(info.action).toBe('pay');
            expect(data).toEqual(payload);
        });

        it('it should create expected payload - only default params', () => {
            const payload: SendPayload = {};

            const cip22Link = createDeeplink({
                action: 'pay',
                payload,
            });

            const info = getDeeplinkInfo(cip22Link);
            const data = info.decodedPayload as SendPayload;

            expect(info.action).toBe('pay');
            expect(data).toEqual({
                recipient: '',
                amountPlanck : '',
                feePlanck: '',
                message: '',
                messageIsText: false,
                encrypt: false,
                immutable: false
            } as SendPayload);
        });


        it('it should create expected payload - ignore unknown props', () => {

            const payload: SendPayload = {
                recipient: 'recipientsAddress',
                amountPlanck: Amount.fromSigna(100).getPlanck(),
                feePlanck: Amount.fromSigna(0.00735).getPlanck(),
                message: 'Test Message',
                messageIsText: true,
                encrypt: true,
                immutable: true,
                // @ts-ignore
                injected: 'malicious stuff'
            };

            const cip22Link = createDeeplink({
                action: 'pay',
                payload,
            });

            const info = getDeeplinkInfo(cip22Link);
            const data = info.decodedPayload as SendPayload;

            expect(info.action).toBe('pay');
            expect(data).toEqual({
                recipient: 'recipientsAddress',
                amountPlanck : '10000000000',
                feePlanck: '735000',
                message: 'Test Message',
                messageIsText: true,
                encrypt: true,
                immutable: true
            } as SendPayload);
        });

        it('it should throw exception on invalid link', () => {
            expect(() => {
                getDeeplinkInfo('signum://some/crazy/link');
            }).toThrow();
        });
    });
});
