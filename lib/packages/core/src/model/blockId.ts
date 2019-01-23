import AbstractModel from './abstractModel';

/**
 * Block Id Model provided by Burst Network
 */
export class BlockId extends AbstractModel {
    public block: string = undefined;

    constructor(data: any) {
        super();
        this.mapJsonToProps(data);
    }
}
