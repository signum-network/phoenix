/**
 *
 * The resulting structure of [[parseDeeplink]]
 *
 * @module util
 */
export interface DeeplinkParts {
    /**
     * The domain, if given
     */
    domain?: string;
    /**
     * The version
     */
    version: string;
    /**
     * The actions name, if given
     */
    action?: string;
    /**
     * The raw/encoded payload
     */
    payload?: string;
    /**
     * The decoded payload. As per default parseDeeplink tries to parse the content
     * as JSON object. If this does not work the decoded string will be returned.
     */
    decodedPayload?: object | string;
}
