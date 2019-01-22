/**
 * Block Model provided by Burst Network
 */
export class Block {
    public id: number = undefined;
    public version: number = undefined;
    public timestamp: number = undefined;
    public height: number = undefined;
    public previousBlockId: number = undefined;
    public previousBlockHash: number[] = undefined;
    public generatorPublicKey: number[] = undefined;
    public totalAmountNQT: number = undefined;
    public totalFeeNQT: number = undefined;
    public payloadLength: number = undefined;
    public generatorId: number = undefined;
    public generatorRS: string = undefined;
    public generationSignature: number[] = undefined;
    public payloadHash: number[] = undefined;
    public blockSignature: number[] = undefined;
    public cumulativeDifficulty: number = undefined;
    public baseTarget: number = undefined;
    public nextBlockId: number = undefined;
    public nonce: number = undefined;
    public byteLength: number = undefined;
    public pocTime: number = undefined;
    public blockAts: number[] = undefined;
    public transactions: string[] = undefined;
    public numberOfTransactions: number = undefined;

    constructor(data: any = {}) {
        Object.keys(data).forEach( k => this[k] = data[k] );
    }
}
