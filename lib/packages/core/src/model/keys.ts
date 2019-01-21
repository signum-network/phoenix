/*
* Copyright 2018 PoC-Consortium
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
