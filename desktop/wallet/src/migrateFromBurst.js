const {copySync, pathExistsSync, createFileSync} = require('fs-extra')
const {join} = require('path')
const {context} = require('./context')

const BurstWalletAppName = 'Phoenix BURST Wallet'
const SignumWalletAppName = 'Phoenix Signum Wallet'
const MigrationMarkerFileName = 'MIGRATED_TO_SIGNUM'

function migrateFromBurst(appDataPath) {

    try {
        const logger = context.getLogger();
        const burstWalletPath = join(appDataPath, BurstWalletAppName)
        const migrationMarkerPath = join(burstWalletPath, MigrationMarkerFileName)

        if (!pathExistsSync(burstWalletPath)) {
            logger.info(`${BurstWalletAppName} not found. Migration ignored`)
            return
        }

        if (pathExistsSync(join(migrationMarkerPath))) {
            logger.info('Already migrated to Signum')
            return
        }

        // copy all files in 'Phoenix BURST Wallet'/'Local Storage'/leveldb to 'Phoenix Signum Wallet'/'Local Storage'/leveldb
        const srcWalletDatabasePath = join(burstWalletPath, 'Local Storage', 'leveldb')
        const destWalletDatabasePath = join(appDataPath, SignumWalletAppName, 'Local Storage', 'leveldb')
        copySync(srcWalletDatabasePath, destWalletDatabasePath)
        createFileSync(join(migrationMarkerPath))
        logger.info('Successfully migrated data to Signum')
    } catch (e) {
        throw new Error(`Burst to Signum Migration failed: ${e}`)
    }

}

module.exports = {
    migrateFromBurst,
}
