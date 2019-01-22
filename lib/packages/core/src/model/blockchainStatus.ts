import AbstractModel from './abstractModel';

export default class BlockchainStatus extends AbstractModel{
    public application: string = undefined;
    public cumulativeDifficulty: string = undefined;
    public isScanning: boolean = undefined;
    public lastBlock: string = undefined;
    public lastBlockchainFeeder: string = undefined;
    public lastBlockchainFeederHeight: number = undefined;
    public numberOfBlocks: number = undefined;
    public requestProcessingTime: number = undefined;
    public time: number = undefined;
    public version: string = undefined;

    constructor(data: any = {}) {
        super();
        this.mapJsonToProps(data);
    }
}
