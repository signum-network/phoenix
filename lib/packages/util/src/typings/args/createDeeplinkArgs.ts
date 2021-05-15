/**
 * Encoder format constants
 * @see [[createDeeplink]] and [[CreateDeeplinkArgs]]
 * @module util
 */
export enum EncoderFormat {
    Text,
    Hexadecimal,
    Base64
}

/**
 * The argument object for [[createDeeplink]]
 *
 * @param {string?} domain The domain used in the protocol
 * @param {string?} action The actions name
 * @param {any?} payload The payload for the action. The payload will be encoded according the _encoderFormat_ parameter
 * @param {EncoderFormat?} encoderFormat The selected format for the payload encoding
 * @module util
 */
export interface CreateDeeplinkArgs {
    domain?: string;
    action?: string;
    payload?: any;
    encoderFormat?: EncoderFormat;
}
