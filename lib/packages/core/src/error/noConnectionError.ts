/**
 * Original work Copyright (c) 2018 PoC-Consortium  
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
export class NoConnectionError extends Error {
    constructor(m: string = "NOTIFICATIONS.ERRORS.CONNECTION") {
        super(m);

        Object.setPrototypeOf(this, NoConnectionError.prototype);
    }

    public toString() {
        return this.message;
    }
}
