/** @module core */

import {MethodArgument} from '@burstjs/contracts';

/**
 * The argument object for [[ContractApi.callContractMethod]]
 *
 *
 */
export interface CallContractMethodArgs {
    amountPlanck: string;
    contractId: string;
    deadline?: number;
    feePlanck: string;
    methodArgs?: MethodArgument[];
    methodHash: string;
    senderPrivateKey: string;
    senderPublicKey: string;
}
