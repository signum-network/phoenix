/** @module core */


/**
 * The argument object for [[ContractApi.publishContrac]]
 *
 * @param codeHex {string}
 * @param deadline {number}
 * @param description {string}
 * @param feePlanck {string}
 * @param activationAmountPlanck {string}
 * @param name {string}
 * @param senderPublicKey {string}
 * @param senderPrivateKey {string}
 *
 */
export interface PublishContractArgs {
    activationAmountPlanck: string;
    codeHex: string;
    deadline?: number;
    description: string;
    feePlanck?: string;
    name: string;
    senderPublicKey: string;
    senderPrivateKey: string;
    // TODO: once supported need to consider this, too
    // cpages: string;
    // data: string;
    // dpages: number;
    // uspages: string;
}
