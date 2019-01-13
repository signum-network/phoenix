
export class NoConnectionError extends Error {
    constructor(m: string = "NOTIFICATIONS.ERRORS.CONNECTION") {
        super(m);

        Object.setPrototypeOf(this, NoConnectionError.prototype);
    }

    public toString() {
        return this.message;
    }
}
