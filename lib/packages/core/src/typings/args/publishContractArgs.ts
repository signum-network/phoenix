/**
 * The argument object for [[ContractApi.publishContract]]
 *
 * @param codeHex {string}
 * @param deadline {number}
 * @param description {string}
 * @param activationAmountPlanck {string}
 * @param name {string}
 * @param senderPublicKey {string}
 * @param senderPrivateKey {string}
 * @module core
 */
export interface PublishContractArgs {
    activationAmountPlanck: string;
    codeHex: string;
    deadline?: number;
    description: string;
    name: string;
    senderPublicKey: string;
    senderPrivateKey: string;
    // TODO: once supported need to consider this, too
    // cpages: string;
    // data: string;
    // dpages: number;
    // uspages: string;
}
