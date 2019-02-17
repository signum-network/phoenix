/** @module crypto */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/*
* Keys class
*
* The Keys class is used to encompass keys associated to an account.
*/
export class Keys {
    public agreementPrivateKey: string;
    public publicKey: string;
    public signPrivateKey: string;

    constructor(data: any = {}) {
        this.agreementPrivateKey = data.agreementPrivateKey || undefined;
        this.publicKey = data.publicKey || undefined;
        this.signPrivateKey = data.signPrivateKey || undefined;
    }
}
