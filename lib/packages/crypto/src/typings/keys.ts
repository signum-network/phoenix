/** @module crypto */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/*
* Keys interface
*
* The Keys class is used to encompass keys associated to an account.
*/
export interface Keys {
    agreementPrivateKey: string;
    publicKey: string;
    signPrivateKey: string;
}
