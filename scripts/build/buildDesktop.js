const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const exec = require('../execAsync');
const log = require('../log');

async function buildAngularWallet(cwd){
    const angularWalletPath = path.join(__dirname, '../../web/angular-wallet');
    process.chdir(angularWalletPath);
    await exec('ng', ['build', '--prod']);
    process.chdir(cwd);
}

async function copyDistFiles(cwd) {
    const src = path.join(__dirname, '../../web/angular-wallet/dist/angular-wallet');
    const dest = path.join(__dirname, '../../desktop/wallet/dist');
    log.info(`Copying dist files
    from: ${chalk.gray(src)} 
    to: ${chalk.gray(dest)}`);
    await fs.copy(src, dest);
}

async function build({cwd}) {
    await buildAngularWallet(cwd);
    await copyDistFiles(cwd);
}

module.exports = build;
