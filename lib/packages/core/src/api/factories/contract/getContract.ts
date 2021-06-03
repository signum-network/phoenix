/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { ChainService } from '../../../service/chainService';
import {Contract} from '../../../typings/contract';

/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.getContract]]
 * @module core.api.factories
 */
export const getContract = (service: ChainService):
    (id: string) => Promise<Contract> =>
    (id: string): Promise<Contract> =>
        service.query('getAT', {
            at: id,
        });
