/** @module util */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {EncoderFormat} from './typings/args/createDeeplinkArgs';
import {convertStringToHexString} from './convertStringToHexString';
import {Base64} from 'js-base64';
import {DeeplinkParts} from './typings/DeeplinkParts';

function decodePayload(payload: any, encoderFormat: EncoderFormat): string {

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


const HexPattern = /^[0-9a-fA-F]+$/;
const isHexFormat = (s: string): boolean => HexPattern.test(s);

const DeeplinkPattern = /^burst.(.+):\/\/(.+)\?action=(.+)&payload=(.+)$/igm;

/**
 * Parses a deeplink according the [CIP22 spec](https://github.com/burst-apps-team/CIPs/blob/master/cip-0022.md)
 *
 * burst.[domain]://v1?action=[action]&payload=[encodedData]
 *
 * @param {string} deeplink The deeplink to be parsed
 * @return The parsed deeplink parts.
 */
export const parseDeeplink = (deeplink: string): DeeplinkParts => {
    const MandatoryPattern = /^burst.(.+):\/\/(v.+?)\??/i;
    const throwError = () => {
        throw new Error('Invalid deeplink: ' + deeplink);
    };

    const extractQueryValue = (query, paramName) => {
        if (!query.startsWith(paramName + '=')) {
            throwError();
        }
        return query.split('=')[1];
    };

    const mandatoryMatches = deeplink.match(MandatoryPattern);
    if (!mandatoryMatches || mandatoryMatches.length !== 3) {
        throwError();
    }

    const result = {
        domain: mandatoryMatches[1],
        version: mandatoryMatches[2],
        action: undefined,
        payload: undefined,
        decodedPayload: undefined
    };

    try {
        const startQueryString = deeplink.indexOf('?');
        if (startQueryString !== -1) {
            const queries = deeplink.substring(startQueryString + 1).split('&');
            if (queries.length >= 1) {
                if (queries.length > 2) {
                    throwError();
                }
                result.action = extractQueryValue(queries[0], 'action');
                if (queries.length === 2) {
                    result.payload = extractQueryValue(queries[1], 'payload');
                }
            }
        }
    } catch (e) {
        throwError();
    }

    return result;
};
