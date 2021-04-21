import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AssetApi.setAccountInfo]]
 *
 * @module core
 */
export interface SetAccountInfoArgs extends DefaultSendArgs {
    /**
     * The accounts name
     */
    name: string;
    /**
     * The accounts description
     */
    description: string;
}
