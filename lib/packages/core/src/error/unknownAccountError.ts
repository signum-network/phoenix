/**
 * Original work Copyright (c) 2018 PoC-Consortium  
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
export class UnknownAccountError extends Error {
    constructor(m: string = "NOTIFICATIONS.ERRORS.UNKNOWN_ACCOUNT") {
        super(m);

        Object.setPrototypeOf(this, UnknownAccountError.prototype);
    }

    public toString() {
        return this.message;
    }
}
