class HttpResponse {
    constructor(public status: number, public response: any, public error?: string) {}

    hasError() { return !!this.error; }
}

export default HttpResponse;
