export default class HttpError {
    requestUrl: string;
    status: number;
    message: string;
    data: any;
    timestamp: number;
    constructor(requestUrl: string, status: number, message: string, data: any);
}
