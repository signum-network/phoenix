
import Github from '../src/github';
import HttpMock from './helpers/httpMock';

/**
 * This test is a reference implementation to show how Http requests can be mocked
 */

// FIXME: Already reported github issue: the mock does not mock!
xdescribe('Github', () => {

    it('should getAllPhoenixContributors easily', async () => {

        HttpMock.onGet().reply(200, [{login: 'ohager'}]);
        const github = new Github();
        const contributors = await github.getAllPhoenixContributors();
        expect(contributors.length).toBe(2);
        expect(contributors).toEqual(['ohager', 'blankey1337']);
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
