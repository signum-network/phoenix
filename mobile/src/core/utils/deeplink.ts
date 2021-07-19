import {DeeplinkParts, parseDeeplink} from '@signumjs/util';

/**
import {createDeeplink} from './createDeeplink';

const payload = {
    "recipient": "S-9K9L-4CB5-88Y5-F5G4Z",
    "amountPlanck": 10000000,
    "feePlanck": 735000,
    "message": "Hi, from a deep link",
    "messageIsText": true,
    "immutable": true,
    "deadline": 24,
    "encrypt": false
}

const deeplink = createDeeplink({
    action: 'pay',
    payload
})

'signum://v1?action=pay&payload=eyJyZWNpcGllbnQiOiJCVVJTVC05SzlMLTRDQjUtODhZNS1GNUc0WiIsImFtb3VudFBsYW5jayI6MTAwMDAwMDAsImZlZVBsYW5jayI6NzM1MDAwLCJtZXNzYWdlIjoiSGksIGZyb20gYSBkZWVwIGxpbmsiLCJtZXNzYWdlSXNUZXh0Ijp0cnVlLCJpbW11dGFibGUiOnRydWUsImRlYWRsaW5lIjoyNCwiZW5jcnlwdCI6ZmFsc2V9'
*/

export interface DeeplinkPayPayload {
    recipient?: string;
    feePlanck?: string;
    amountPlanck?: string;
    message?: string;
    messageIsText?: boolean;
    encrypt?: boolean;
    immutable?: boolean;
}

export const SupportedDeeplinkActions = {
    Pay: 'pay'
};

enum DeeplinkType {
    UNKNOWN = -1,
    LEGACY,
    CIP22
}


function parseURLParams(queryString: string): any {
    const query = {};
    const firstVar = queryString.indexOf('?');
    const pairs = (firstVar > -1 ? queryString.substr(firstVar + 1) : queryString).split('&');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        // @ts-ignore
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

const parseLegacyDeeplink = (url: string): DeeplinkParts => {
    const params = parseURLParams(url);

    const sendPayload: DeeplinkPayPayload = {
        recipient: params.receiver || '',
        feePlanck: params.feeNQT || '',
        amountPlanck: params.amountNQT || '',
        message: params.message || '',
        messageIsText: params.messageIsText?.toLowerCase() !== 'false',
        encrypt: params.encrypt?.toLowerCase() === 'true',
        immutable: params.immutable?.toLowerCase() === 'true'
    };

    return {
        version: 'legacy',
        action: SupportedDeeplinkActions.Pay,
        decodedPayload: sendPayload,
        payload: params,
    };
};

const parseCIP22Deeplink = (url: string): DeeplinkParts => {
    const parsed = parseDeeplink(url);

    const decoded = parsed.decodedPayload as DeeplinkPayPayload;

    // direct 1:1 explicit mapping to avoid injections
    parsed.decodedPayload = {
        recipient: decoded.recipient || '',
        feePlanck: decoded.feePlanck || '',
        amountPlanck: decoded.amountPlanck || '',
        message: decoded.message || '',
        messageIsText: decoded.messageIsText || false,
        encrypt: decoded.encrypt || false,
        immutable: decoded.immutable || false,
    };

    return parsed;
};

const isLegacyDeepLink = (url: string): boolean => {
    const route = url.replace(/.*?:\/\//g, '');
    const routeName = route.split('/')[0];
    return routeName.indexOf('requestBurst') !== -1;
};


function isCIP22DeepLink(url: string): boolean {
    try {
        parseDeeplink(url);
        return true;
    } catch (e) {
        return false;
    }
}

const getDeeplinkType = (url: string): DeeplinkType => {
    if (isLegacyDeepLink(url)) {
        return DeeplinkType.LEGACY;
    }

    if (isCIP22DeepLink(url)) {
        return DeeplinkType.CIP22;
    }

    return DeeplinkType.UNKNOWN;
};

export const getDeeplinkInfo = (url: string): DeeplinkParts => {
    const type = getDeeplinkType(url);
    switch (type) {
        case DeeplinkType.CIP22:
            return parseCIP22Deeplink(url);
        case DeeplinkType.LEGACY:
            return parseLegacyDeeplink(url);
        case DeeplinkType.UNKNOWN:
        default:
            throw new Error('Unsupported link');
    }
};
