const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const log = require('../log');
const appVersion = require('../../web/angular-wallet/package.json').version;

async function updateVersion(options) {

    const versionFilePath = path.join(__dirname, '../../web/angular-wallet/src/environments/version.ts');

    const src = `
// this is an automatically updated file - don't change it
export const version = '${appVersion}';
`;

    try {
        log.info((`Writing Ng version ${chalk.bold.yellow(appVersion)} to
         
${chalk.bold.grey(versionFilePath)}
        `));
        await fs.outputFile(versionFilePath, src, {flat: 'w'});

    } catch (err) {
        log.error('Woot - Something went wrong: ' + err);
    }

}

module.exports = updateVersion;
