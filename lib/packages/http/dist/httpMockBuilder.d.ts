import Http from './http';
export default class HttpMockBuilder {
    private readonly _httpMock;
    private constructor();
    static create(): HttpMockBuilder;
    private onReply;
    private onThrowError;
    onGetReply(status: number, data: any, url?: string): HttpMockBuilder;
    onGetThrowError(status: number, errorMessage: string, data?: any, url?: string): HttpMockBuilder;
    onPostReply(status: number, data: any, url?: string): HttpMockBuilder;
    onPostThrowError(status: number, errorMessage: string, data: any, url?: string): HttpMockBuilder;
    onPutReply(status: number, data: any, url?: string): HttpMockBuilder;
    onPutThrowError(status: number, errorMessage: string, data: any, url?: string): HttpMockBuilder;
    onDeleteReply(status: number, data: any, url?: string): HttpMockBuilder;
    onDeleteThrowError(status: number, errorMessage: string, data: any, url?: string): HttpMockBuilder;
    build(): Http;
}
