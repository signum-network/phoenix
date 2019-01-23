import {BaseService} from '../baseService';

describe('BaseService', () => {

    describe('toBRSEndpoint() relative Path', () => {

        let service = new BaseService('localhost');

        it('should create BRS BURST url without any parameter', () => {
            const url = service.toBRSEndpoint('getBlockByHeight');
            expect(url).toBe('?requestType=getBlockByHeight');
        });

        it('should create BRS BURST url with one parameter', () => {
            const url = service.toBRSEndpoint('getBlockByHeight', {id: 123});
            expect(url).toBe('?requestType=getBlockByHeight&id=123');
        });

        it('should create BRS BURST url with many parameters', () => {
            const url = service.toBRSEndpoint('getBlockByHeight', {id: 123, includeTransactions: true});
            expect(url).toBe('?requestType=getBlockByHeight&id=123&includeTransactions=true');
        });

        it('should create BRS BURST url with many parameters and relative Url', () => {
            service = new BaseService('localhost', '/burst/'); // chopps trailing slash
            const url = service.toBRSEndpoint('getBlockByHeight', {id: 123, includeTransactions: true});
            expect(url).toBe('/burst?requestType=getBlockByHeight&id=123&includeTransactions=true');
        });

    });

});
