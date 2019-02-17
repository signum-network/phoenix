import {HttpMockBuilder} from '..';

describe('HttpMockBuilder', () => {

    it('onGetReply for all urls', async () => {

        const mockedHttp = HttpMockBuilder
            .create()
            .onGetReply(200, {foo: 'bar'})
            .build();

        let response = await mockedHttp.get('/url');
        expect(response.status).toEqual(200);
        expect(response.response).toEqual({foo: 'bar'});

        response = await mockedHttp.get('/url/other');
        expect(response.status).toEqual(200);
        expect(response.response).toEqual({foo: 'bar'});

    });

    it('onGetReply for specific url', async () => {

        const mockedHttp = HttpMockBuilder
            .create()
            .onGetReply(200, {foo: 'bar'}, '/url/1')
            .onGetReply(204, {bar: 'foo'}, '/url/2')
            .build();

        let response = await mockedHttp.get('/url/1');
        expect(response.status).toEqual(200);
        expect(response.response).toEqual({foo: 'bar'});

        response = await mockedHttp.get('/url/2');
        expect(response.status).toEqual(204);
        expect(response.response).toEqual({bar: 'foo'});

    });

    it('reset works', async () => {

        const mockedHttp = HttpMockBuilder
            .create()
            .onGetReply(200, {foo: 'bar'})
            .build();

        // works fine
        await mockedHttp.get('/url');

        // @ts-ignore
        mockedHttp.reset();
        try {
            await mockedHttp.get('/url/other');
        } catch (e) {
            expect(e.message).toEqual('Could not find any mocked function for method GET url /url/other');
        }
    });


    it('Not existing mock for specific url', async () => {

        const mockedHttp = HttpMockBuilder
            .create()
            .onGetReply(200, {foo: 'bar'}, '/url/1')
            .build();

        try {
            await mockedHttp.get('/url/not/known');
            expect(true).toBe('Expected Exception');
        } catch (e) {
            expect(e.message).toEqual('Could not find any mocked function for method GET url /url/not/known');
        }

    });



    it('onGetThrowError for any url', async () => {

        const mockedHttp = HttpMockBuilder
            .create()
            .onGetThrowError(500, 'Epic Fail', {foo: 'bar'})
            .build();

        try {
            await mockedHttp.get('/url/1');
            expect(true).toBe('Expected an exception!');
        } catch (e) {
            expect(e.requestUrl).toBe('__all');
            expect(e.timestamp).not.toBeNull();
            expect(e.status).toBe(500);
            expect(e.message).toBe('Epic Fail');
            expect(e.data).toEqual({foo: 'bar'});
        }

        try {
            await mockedHttp.get('/url/2');
            expect(true).toBe('Expected an exception!');
        } catch (e) {
            expect(e).not.toBeNull(); // same as above
        }

    });

    it('onGetThrowError for specific url', async () => {

        const mockedHttp = HttpMockBuilder
            .create()
            .onGetThrowError(404, 'Not found', null, '/url/1')
            .onGetThrowError(500, 'Epic Fail', {foo: 'bar'}, '/url/2')
            .build();

        try {
            await mockedHttp.get('/url/1');
            expect(true).toBe('Expected an exception!');
        } catch (e) {
            expect(e.requestUrl).toBe('/url/1');
            expect(e.timestamp).not.toBeNull();
            expect(e.status).toBe(404);
            expect(e.message).toBe('Not found');
            expect(e.data).toBeNull();
        }

        try {
            await mockedHttp.get('/url/2');
            expect(true).toBe('Expected an exception!');
        } catch (e) {
            expect(e.requestUrl).toBe('/url/2');
            expect(e.timestamp).not.toBeNull();
            expect(e.status).toBe(500);
            expect(e.message).toBe('Epic Fail');
            expect(e.data).toEqual({foo: 'bar'});
        }

    });

    it('mixed registries for all urls', async () => {

        const mockedHttp = HttpMockBuilder
            .create()
            .onGetReply(200, {foo: 'get'})
            .onPostReply(201, {foo: 'post'})
            .onPutReply(200, {foo: 'put'})
            .onDeleteReply(204, {foo: 'delete'})
            .build();

        let response = await mockedHttp.get('/url');
        expect(response.status).toEqual(200);
        expect(response.response).toEqual({foo: 'get'});

        response = await mockedHttp.post('/url/post', {faz: 'post'}); // payload will be ignored
        expect(response.status).toEqual(201);
        expect(response.response).toEqual({foo: 'post'});

        response = await mockedHttp.put('/url/put', {faz: 'put'}); // payload will be ignored
        expect(response.status).toEqual(200);
        expect(response.response).toEqual({foo: 'put'});

        response = await mockedHttp.delete('/url/delete');
        expect(response.status).toEqual(204);
        expect(response.response).toEqual({foo: 'delete'});

    });

    it('mixed registries for all urls #2', async () => {

        const mockedHttp = HttpMockBuilder
            .create()
            .onGetReply(200, {foo: 'get'})
            .onPostThrowError(500, 'Post Error', {e: 'post'})
            .onPutThrowError(404, 'Put Error', {e: 'put'})
            .onDeleteThrowError(403, 'Delete Error', {e: 'delete'})
            .build();

        const response = await mockedHttp.get('/url');
        expect(response.status).toEqual(200);
        expect(response.response).toEqual({foo: 'get'});

        try {
            await mockedHttp.post('/url/post', {faz: 'post'});
            expect(true).toBe('Expected Exception : post');
        } catch (e) {
            expect(e.status).toBe(500);
            expect(e.message).toBe('Post Error');
            expect(e.data).toEqual({e: 'post'});
        }

        try {
            await mockedHttp.put('/url/put', {faz: 'put'});
            expect(true).toBe('Expected Exception : put');
        } catch (e) {
            expect(e.status).toBe(404);
            expect(e.message).toBe('Put Error');
            expect(e.data).toEqual({e: 'put'});
        }

        try {
            await mockedHttp.delete('/url/delete');
            expect(true).toBe('Expected Exception : delete');
        } catch (e) {
            expect(e.status).toBe(403);
            expect(e.message).toBe('Delete Error');
            expect(e.data).toEqual({e: 'delete'});
        }

    });


    it('mixed registries for specific urls', async () => {

        const mockedHttp = HttpMockBuilder
            .create()
            .onGetReply(200, {foo: 'get'}, '/get/success')
            .onGetThrowError(500, 'get error', {}, '/get/error')
            .onPostReply(201, {foo: 'post'}, '/post/success')
            .onPostThrowError(500, 'post error', {}, '/post/error')
            .build();

        let response = await mockedHttp.get('/get/success');
        expect(response.status).toEqual(200);
        expect(response.response).toEqual({foo: 'get'});

        response = await mockedHttp.post('/post/success', {faz: 'post'}); // payload will be ignored
        expect(response.status).toEqual(201);
        expect(response.response).toEqual({foo: 'post'});

        try {
            await mockedHttp.get('/get/error');
            expect(true).toBe('Expected Exception : get');
        } catch (e) {
            expect(e.status).toBe(500);
            expect(e.message).toBe('get error');
            expect(e.data).toEqual({});
        }

        try {
            await mockedHttp.post('/post/error', {faz: 'post'});
            expect(true).toBe('Expected Exception : post');
        } catch (e) {
            expect(e.status).toBe(500);
            expect(e.message).toBe('post error');
            expect(e.data).toEqual({});
        }


    });



});
