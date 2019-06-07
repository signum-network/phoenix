declare class MockBehavior {
    private method;
    private endpoint;
    constructor(method: string, endpoint?: string);
    reply<T>(status: number, response: T): void;
    error(status: number, message: string): void;
}
declare class HttpMock {
    static onGet(endpoint?: string): MockBehavior;
    static onPost(endpoint?: string): MockBehavior;
    static onPut(endpoint?: string): MockBehavior;
    static onDelete(endpoint?: string): MockBehavior;
    static reset(): void;
}
export default HttpMock;
