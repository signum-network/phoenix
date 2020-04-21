/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import {Contract} from '../../../typings/contract';
import {ContractIdList} from '../../../typings/contractIdList';

/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.getAllContractIds]]
 * @module core.api.factories
 */
export const getAllContractIds = (service: BurstService):
    () => Promise<ContractIdList> =>
    (): Promise<ContractIdList> =>
        service.query('getATIds');
