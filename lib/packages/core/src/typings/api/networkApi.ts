import {BlockchainStatus} from "../blockchainStatus";
import {ServerStatus} from "../serverStatus";
import {SuggestedFees} from "../../suggestedFees";

export interface NetworkApi {
    getBlockchainStatus: () => Promise<BlockchainStatus>;
    getServerStatus: () => Promise<ServerStatus>;
    suggestFee: () => Promise<SuggestedFees>;
}
