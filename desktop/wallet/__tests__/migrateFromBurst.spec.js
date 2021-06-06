const {join} = require('path');
const {pathExistsSync, emptyDirSync, removeSync, ensureFileSync, moveSync} = require('fs-extra');
const {migrateFromBurst} = require('../src/migrateFromBurst');

const TestAppDataPath = join(__dirname, 'data/migration')
const BurstAppDataPath = join(TestAppDataPath, 'Phoenix BURST Wallet')
const SignumAppDataPath = join(TestAppDataPath, 'Phoenix Signum Wallet')
const LevelDbPath = join(SignumAppDataPath, 'Local Storage/leveldb')
const MigratedFilePath = join(BurstAppDataPath, 'MIGRATED_TO_SIGNUM')

describe('migrateFromBurst', () => {

    beforeEach(() => {
        removeSync(MigratedFilePath)
        emptyDirSync(LevelDbPath)
    })

    afterAll(() => {
        removeSync(MigratedFilePath)
        emptyDirSync(LevelDbPath)
    })

    it('should copy files as expected', () => {
        migrateFromBurst(TestAppDataPath)
        expect(pathExistsSync(join(LevelDbPath, 'burstdata1.db'))).toBeTruthy()
        expect(pathExistsSync(join(LevelDbPath, 'burstdata2.db'))).toBeTruthy()
    })

    it('should ignore of already migrated', () => {
        ensureFileSync(MigratedFilePath)
        migrateFromBurst(TestAppDataPath)
        expect(pathExistsSync(join(LevelDbPath, 'burstdata1.db'))).toBeFalsy()
        expect(pathExistsSync(join(LevelDbPath, 'burstdata2.db'))).toBeFalsy()
    })

    it('should ignore if not exists', () => {
        moveSync(BurstAppDataPath, join(BurstAppDataPath + '_bak'))
        migrateFromBurst(TestAppDataPath)
        expect(pathExistsSync(join(LevelDbPath, 'burstdata1.db'))).toBeFalsy()
        expect(pathExistsSync(join(LevelDbPath, 'burstdata2.db'))).toBeFalsy()
        moveSync(join(BurstAppDataPath + '_bak'), BurstAppDataPath)
    })
})

