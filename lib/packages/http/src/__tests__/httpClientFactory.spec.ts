import {HttpClientFactory} from '../httpClientFactory';

describe('HttpClientFactory', () => {
    it('should create adapter', () => {
        const http = HttpClientFactory.createHttpClient('http://localhost:3000');
        expect(http).toBeDefined();
        expect(http.delete).toBeDefined();
        expect(http.post).toBeDefined();
        expect(http.get).toBeDefined();
        expect(http.put).toBeDefined();
    });
});
