import Http from '../http'

describe('Http', () => {

    it('get test', async () => {
        const http = new Http();
        const result = await http.get('http://127.0.0.1/foo/url');
        expect(result.status).toBe(200);
        expect(result.response).toBe('get http://127.0.0.1/foo/url');
    })
});
