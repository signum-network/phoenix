/**
 * The argument object for [[ContractApi.publishContract]]
 *
 * @param activationAmountPlanck {string} The amount in planck needed to execute the contract
 * @param codeHex {string} The compiled program in hex form (recommend to use [BlockTalk](https://github.com/burst-apps-team/blocktalk smart contracts compiler)
 * @param deadline {number} Optional deadline in minutes, default is 1440
 * @param description {string} The description of your contract (max. 1000 chars)
 * @param isCIP20Active {string} This flag is used to determine the minimum creation fee calculation method.
 * Before the "SODIUM" hardfork (BRS Versions <2.5 and blockHeight <765.000) this flag should be false, otherwise true, to have reduced fee costs.
 * This is likely to be removed/ignored once the Hard fork is established
 * @param name {string} The name for the contract
 * @param senderPrivateKey {string} The senders private key to sign the transaction
 * @param senderPublicKey {string} The senders public key
 * @module core
 */
export interface PublishContractArgs {
    activationAmountPlanck: string;
    codeHex: string;
    deadline?: number;
    description: string;
    isCIP20Active: boolean;
    name: string;
    senderPublicKey: string;
    senderPrivateKey: string;
    // TODO: once supported need to consider this, too
    // cpages: string;
    // data: string;
    // dpages: number;
    // uspages: string;
}
