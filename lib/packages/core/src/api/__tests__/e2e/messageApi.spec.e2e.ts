import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../burstService';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe('[E2E] Transaction Api', () => {

    const service = new BurstService(environment.testNetHost, environment.testNetApiPath);

    it('should getTransaction', async () => {
        // ... more here, if you want :P
    });

});
