export interface GetBlockchainStatusResponse {
    application: string,
    cumulativeDifficulty: string,
    isScanning: boolean
    lastBlock: string,
    lastBlockchainFeeder: string,
    lastBlockchainFeederHeight: number,
    numberOfBlocks: number,
    requestProcessingTime: number,
    time: number,
    version: string
}