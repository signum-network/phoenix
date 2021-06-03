/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { ChainService } from '../../../service/chainService';
import {Contract} from '../../../typings/contract';
import {ContractIdList} from '../../../typings/contractIdList';

/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.getAllContractIds]]
 * @module core.api.factories
 */
export const getAllContractIds = (service: ChainService):
    () => Promise<ContractIdList> =>
    (): Promise<ContractIdList> =>
        service.query('getATIds');
