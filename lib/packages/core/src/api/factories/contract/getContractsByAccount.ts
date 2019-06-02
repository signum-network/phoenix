/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import {Contract} from '../../../typings/contract';
import {ContractList} from '../../../typings/contractList';

/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[ContractApi.getContractsByAccount]]
 */
export const getContractsByAccount = (service: BurstService):
    (accountId: string) => Promise<ContractList> =>
    (accountId: string): Promise<ContractList> =>
        service.query('getAccountATs', {
            account: accountId,
        });
