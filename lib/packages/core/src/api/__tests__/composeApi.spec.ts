import {ApiSettings, composeApi} from '../composeApi';
import {ApiVersion} from '../../constants/apiVersion';

describe('composeApi', () => {

    it('should compose with no errors', async () => {
        const api = composeApi(new ApiSettings(
            'nodeHost',
            ApiVersion.V1,
            {
                headers: {
                    'X-Test': 'some test'
                }
            }
        ));

        expect(api.asset).toBeDefined();
        expect(api.account).toBeDefined();
        expect(api.alias).toBeDefined();
        expect(api.block).toBeDefined();
        expect(api.contract).toBeDefined();
        expect(api.message).toBeDefined();
        expect(api.network).toBeDefined();
        expect(api.transaction).toBeDefined();
    });

});
