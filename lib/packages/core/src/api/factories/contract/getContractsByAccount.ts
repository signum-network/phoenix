/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import {Contract} from '../../../typings/contract';
import {ContractList} from '../../../typings/contractList';

/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.getContractsByAccount]]
 * @module core.api.factories
 */
export const getContractsByAccount = (service: BurstService):
    (accountId: string) => Promise<ContractList> =>
    (accountId: string): Promise<ContractList> =>
        service.query('getAccountATs', {
            account: accountId,
        });
