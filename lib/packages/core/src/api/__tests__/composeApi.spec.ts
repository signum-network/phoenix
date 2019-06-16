import {ApiSettings, composeApi} from '../composeApi';

describe('composeApi', () => {

    it('should compose with no errors', async () => {
        const api = composeApi(new ApiSettings(
            'nodeHost',
            'apiRootUrl'
        ));
        expect(api.account).toBeDefined();
        expect(api.alias).toBeDefined();
        expect(api.block).toBeDefined();
        expect(api.contract).toBeDefined();
        expect(api.message).toBeDefined();
        expect(api.network).toBeDefined();
        expect(api.transaction).toBeDefined();
    });

});
