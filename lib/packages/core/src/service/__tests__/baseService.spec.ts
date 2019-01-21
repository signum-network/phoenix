import BaseService from '../baseService';

/**
 * This test is a reference implementation to show how Http requests can be mocked
 */
describe('BaseService', () => {

    it('should create BRS BURST url without any parameter', () => {
        const url = BaseService.toBRSEndpoint('getBlock');
        expect(url).toBe('?requestType=getBlock');
    });

    it('should create BRS BURST url with one parameter', () => {
        const url = BaseService.toBRSEndpoint('getBlock', {id: 123});
        expect(url).toBe('?requestType=getBlock&id=123');
    });

    it('should create BRS BURST url with many parameters', () => {
        const url = BaseService.toBRSEndpoint('getBlock', {id: 123, includeTransactions: true});
        expect(url).toBe('?requestType=getBlock&id=123&includeTransactions=true');
    });

    // TODO: extend for array data

});
