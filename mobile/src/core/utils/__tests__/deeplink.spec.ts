import {getDeeplinkInfo, DeeplinkPayPayload} from '../deeplink';
import {createDeeplink, Amount} from '@signumjs/util';

describe('deeplink', () => {
    describe('legacy', () => {
        it('it should create expected payload', () => {
            // tslint:disable-next-line:max-line-length
            const legacyLink = 'signum://requestBurst?receiver=S-LJRV-9LE8-VJ5B-57W4C&amountNQT=20000000000&feeNQT=2205000&immutable=false&message=4c956fdb7701&messageIsText=false';
            const info = getDeeplinkInfo(legacyLink);
            const data = info.decodedPayload as DeeplinkPayPayload;

            expect(info.action).toBe('pay');
            expect(data).toEqual({
                recipient: 'S-LJRV-9LE8-VJ5B-57W4C',
                amountPlanck: '20000000000',
                feePlanck: '2205000',
                message: '4c956fdb7701',
                messageIsText: false,
                encrypt: false,
                immutable: false,
            } as DeeplinkPayPayload);
        });

        it('it should create expected payload - default params', () => {
            const legacyLink = 'signum://requestBurst?';
            const info = getDeeplinkInfo(legacyLink);
            const data = info.decodedPayload as DeeplinkPayPayload;

            expect(info.action).toBe('pay');
            expect(data).toEqual({
                recipient: '',
                amountPlanck: '',
                feePlanck: '',
                message: '',
                messageIsText: true,
                encrypt: false,
                immutable: false,
            } as DeeplinkPayPayload);
        });

        it('it should create expected payload - ignore unknown props', () => {
            const legacyLink = 'signum://requestBurst?receiver=S-LJRV-9LE8-VJ5B-57W4C&amountNQT=20000000000&feeNQT=2205000&immutable=false&message=4c956fdb7701&messageIsText=false&inject=malicious';
            const info = getDeeplinkInfo(legacyLink);
            const data = info.decodedPayload as DeeplinkPayPayload;

            expect(info.action).toBe('pay');
            expect(data).toEqual({
                recipient: 'S-LJRV-9LE8-VJ5B-57W4C',
                amountPlanck: '20000000000',
                feePlanck: '2205000',
                message: '4c956fdb7701',
                messageIsText: false,
                encrypt: false,
                immutable: false,
            } as DeeplinkPayPayload);
        });

        it('it should throw exception on false link', () => {
            const legacyLink = 'signum://invalid?receiver=S-LJRV-9LE8-VJ5B-57W4C';
            expect(() => {
                getDeeplinkInfo(legacyLink);
            }).toThrow();
        });
    });
    describe('cip22', () => {
        it('it should create expected payload - all params', () => {
            const payload: DeeplinkPayPayload = {
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
            const data = info.decodedPayload as DeeplinkPayPayload;

            expect(info.action).toBe('pay');
            expect(data).toEqual(payload);
        });

        it('it should create expected payload - only default params', () => {
            const payload: DeeplinkPayPayload = {};

            const cip22Link = createDeeplink({
                action: 'pay',
                payload,
            });

            const info = getDeeplinkInfo(cip22Link);
            const data = info.decodedPayload as DeeplinkPayPayload;

            expect(info.action).toBe('pay');
            expect(data).toEqual({
                recipient: '',
                amountPlanck : '',
                feePlanck: '',
                message: '',
                messageIsText: false,
                encrypt: false,
                immutable: false
            } as DeeplinkPayPayload);
        });
        it('it should create expected payload - ignore unknown props', () => {

            const payload: DeeplinkPayPayload = {
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
            const data = info.decodedPayload as DeeplinkPayPayload;

            expect(info.action).toBe('pay');
            expect(data).toEqual({
                recipient: 'recipientsAddress',
                amountPlanck : '10000000000',
                feePlanck: '735000',
                message: 'Test Message',
                messageIsText: true,
                encrypt: true,
                immutable: true
            } as DeeplinkPayPayload);
        });

        it('it should throw exception on invalid link', () => {
            expect(() => {
                getDeeplinkInfo('signum://some/crazy/link');
            }).toThrow();
        });
    });
});
