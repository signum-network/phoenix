/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import {Contract} from '../../../typings/contract';

/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.getContract]]
 * @module core.api.factories
 */
export const getContract = (service: BurstService):
    (id: string) => Promise<Contract> =>
    (id: string): Promise<Contract> =>
        service.query('getAT', {
            at: id,
        });
