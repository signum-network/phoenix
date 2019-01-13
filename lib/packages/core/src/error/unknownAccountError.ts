
export class UnknownAccountError extends Error {
    constructor(m: string = "NOTIFICATIONS.ERRORS.UNKNOWN_ACCOUNT") {
        super(m);

        Object.setPrototypeOf(this, UnknownAccountError.prototype);
    }

    public toString() {
        return this.message;
    }
}
