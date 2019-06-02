import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../service/burstService';
import {getContract} from '../../factories/contract';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe('[E2E] Contract Api', () => {

    const service = new BurstService({
        nodeHost: environment.testNetHost,
        apiRootUrl: environment.testNetApiPath
    });

    it('should getContract', async () => {
        const contract = await getContract(service)(environment.testContractId);
        expect(contract).toBeDefined();
        expect(contract.at).toBe(environment.testContractId);
    });
});
