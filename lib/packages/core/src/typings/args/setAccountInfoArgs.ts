import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AccountApi.setAccountInfo]]
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
