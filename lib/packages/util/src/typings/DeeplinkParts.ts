/**
 *
 * The resulting structure of [[parseDeeplink]]
 *
 * @module util
 */
export interface DeeplinkParts {
    domain: string;
    version: string;
    action?: string;
    payload?: string;
}
