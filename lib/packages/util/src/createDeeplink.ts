/** @module util */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {CreateDeeplinkArgs, EncoderFormat} from './typings/args/createDeeplinkArgs';
import {convertStringToHexString} from './convertStringToHexString';
import {Base64} from 'js-base64';

function encodePayload(payload: any, encoderFormat: EncoderFormat): string {

    let data = payload;
    if (typeof payload !== 'string') {
        data = JSON.stringify(payload);
    }

    switch (encoderFormat) {
        case EncoderFormat.Hexadecimal:
            return convertStringToHexString(data);
        case EncoderFormat.Base64:
            return Base64.encode(data);
        case EncoderFormat.Text:
        default:
            // noop
            return data;
    }
}

/**
 * Creates a deeplink according the [CIP22 spec](https://github.com/burst-apps-team/CIPs/blob/master/cip-0022.md)
 *
 * burst.[domain]://v1?action=[action]&payload=[encodedData]
 *
 * Deeplinks are a way to call/open applications and do certain actions within it, e.g. Phoenix wallet
 * can redirect to the "Send Burst" screen a fill out the form according the passed payload.
 *
 * @param {CreateDeeplinkArgs} args The arguments for the deeplink
 * @return The Deeplink
 */
export const createDeeplink = (args: CreateDeeplinkArgs): string => {

    const {encoderFormat = EncoderFormat.Base64, domain, action, payload} = args;

    let link = `burst.${domain}://v1`;

    if (action) {
        link += `?action=${action}`;
    }

    if (payload) {
        link += `&payload=${encodePayload(payload, encoderFormat)}`;
    }

    return link;
};
