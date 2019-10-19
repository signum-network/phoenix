import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../service/burstService';
import {getContractsByAccount} from '../../factories/contract/getContractsByAccount';
import {getContract} from '../../factories/contract/getContract';
import {getAllContractIds} from '../../factories/contract';

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

    it('should getContractsByAccount', async () => {
        const contract = await getContractsByAccount(service)(environment.testContractCreatorId);
        expect(contract.ats.length).toBeGreaterThanOrEqual(1);
    });

    it('should getAllContractIds', async () => {
        const contractIdList = await getAllContractIds(service)();
        expect(contractIdList.atIds.length).toBeGreaterThan(0);
    });
});
