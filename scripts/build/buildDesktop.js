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
    const src = path.join(__dirname, '../../web/angular-wallet/dist');
    const dest = path.join(__dirname, '../../desktop/wallet/dist');
    await fs.remove(dest);
    log.info(`Copying dist files
    from: ${chalk.gray(src)} 
    to: ${chalk.gray(dest)}`);
    await fs.copy(src, dest);
}

// electron requires the base href to be relative, whereas most webservers assume a static root
async function updateBaseHref(cwd) {
    const indexPath = '../../desktop/wallet/dist/index.html';
    let indexText = await fs.readFile(path.join(__dirname, indexPath), 'utf8');
    indexText = indexText.replace('href="/"', 'href="./"');
    await fs.writeFile(path.join(__dirname, indexPath), indexText, 'utf8');
}

async function build({cwd}) {
    await buildAngularWallet(cwd);
    await copyDistFiles(cwd);
    await updateBaseHref(cwd);
}

module.exports = build;
