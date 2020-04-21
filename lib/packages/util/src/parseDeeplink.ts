/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {DeeplinkParts} from './typings/DeeplinkParts';

const MandatoryPattern = /^burst.(.+):\/\/(v.+?)\??/i;
/**
 * Parses a deeplink according the [CIP22 spec](https://github.com/burst-apps-team/CIPs/blob/master/cip-0022.md)
 *
 * `burst.[domain]://v1?action=[action]&payload=[encodedData]`
 *
 * @see [[createDeeplink]] as inverse function
 * @param {string} deeplink The deeplink to be parsed
 * @return The parsed deeplink parts.
 * @throws Error if parsing fails
 * @module util
 */
export const parseDeeplink = (deeplink: string): DeeplinkParts => {
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
