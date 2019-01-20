jest.mock('@burst/http/src/http');
import {HttpMock} from '@burst/http';

import Github from '../github';

/**
 * This test is a reference implementation to show how Http requests can be mocked
 */

// FIXME: Already reported github issue: the mock does not mock!
xdescribe('Github', () => {

    beforeEach(() => {
        HttpMock.reset();
    });

    it('should getAllPhoenixContributors easily', async () => {

        // mock for any get
        HttpMock.onGet().reply(200, [{login: 'foo'}, {login: 'bar'}]);
        const github = new Github();
        const contributors = await github.getAllPhoenixContributors();
        expect(contributors.length).toBe(2);
        expect(contributors).toEqual(['foo', 'bar']);
    });


    it('should getAllPhoenixContributors - specific url mock', async () => {

        // mock for that very specific endpoint
        HttpMock.onGet('/phoenix/contributors').reply(200, [{login: 'baz'}]);
        const github = new Github();
        const contributors = await github.getAllPhoenixContributors();
        expect(contributors.length).toBe(1);
        expect(contributors).toEqual(['baz']);
    });

    it('should getAllPhoenixContributors - specific url mock , but non-existing', async () => {

        // mock for that very specific endpoint
        HttpMock.onGet('/phoenix/contributors/invalid').reply(200, [{login: 'baz'}]);
        const github = new Github();
        try {
            await github.getAllPhoenixContributors();
            expect('Should throw exception').toBeTruthy();
        } catch (e) {
            expect(e.message)
                .toBe('No mock for called endpoint \'/phoenix/contributors\' found. Use onGet() or onGet(\'/phoenix/contributors\').');
        }
    });


    it('should return error on getAllPhoenixContributors  failure', async () => {
        HttpMock.onGet().error(500, 'Oh no, internal server error. Blame the backend');
        const github = new Github();
        try {
            await github.getAllPhoenixContributors();
        } catch (e) {
            expect(e).toBe('Oh no, internal server error. Blame the backend');
        }
    });
});
