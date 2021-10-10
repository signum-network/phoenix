const path = require('path');
const fs = require('fs-extra');
const {prompt} = require('inquirer')
const semver = require('semver')
const exec = require('../execAsync');
const log = require('../log');

const ElectronPath = path.join(__dirname, '../../desktop/wallet')
const AngularPath = path.join(__dirname, '../../web/angular-wallet')

async function updatePackageVersion(newVersion, packagePath) {
    const packageObj = await fs.readJson(packagePath);
    packageObj.version = newVersion
    await fs.writeJson(packagePath, packageObj, {spaces: 2})
}

async function bumpVersion(newVersion) {
    const getPackagePath = (basePath) => path.join(basePath, './package.json')
    await updatePackageVersion(newVersion, getPackagePath(ElectronPath))
    await updatePackageVersion(newVersion, getPackagePath(AngularPath))
}

async function getNewVersion() {

    const {version} = require(path.join(AngularPath, '/package.json'))

    log.info(`Current version is: ${version}`)

    const {newVersion} = await prompt([
        {
            type: 'input',
            name: 'newVersion',
            message: "What's the new version?",
        }
    ])

    if (!semver.valid(newVersion)) {
        throw Error(`Version ${newVersion} is not a valid semantic version`)
    }

    if (semver.lt(newVersion, version)) {
        throw Error(`Version ${newVersion} is not greater than previous version: ${version}`)
    }

    const {isConfirmed} = await prompt([
        {
            type: 'confirm',
            name: 'isConfirmed',
            message: "Are you sure?",
        }
    ]);

    if (!isConfirmed) {
        log.info('Cancelled by user')
        process.exit(0)
    }

    return newVersion
}

async function createAndPushTag(newVersion) {
    const newTag = `desktop-${newVersion}`
    await exec('git', ['commit', '--allow-empty', `-am New Version: ${newVersion}`]);
    await exec('git', ['push']); // runs pre-push script
    await exec('git', ['tag', newTag]);
    await exec('git', ['push', 'origin', 'tag', newTag, '--no-verify']);
}

async function publish() {
    const newVersion = await getNewVersion()
    await bumpVersion(newVersion)
    await createAndPushTag(newVersion)
}

module.exports = publish;
