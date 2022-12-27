const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const exec = require('../execAsync');
const log = require('../log');

async function buildAngularWallet(cwd){
    const angularWalletPath = path.join(__dirname, '../../web/angular-wallet');
    process.chdir(angularWalletPath);
    await exec(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'build:prod']);
    process.chdir(cwd);
}

async function cleanDistFiles(){
    const dest = path.join(__dirname, '../../desktop/wallet/dist');
    await fs.remove(dest);
}

async function copyDistFiles(cwd) {
    const src = path.join(__dirname, '../../web/angular-wallet/dist');
    const dest = path.join(__dirname, '../../desktop/wallet/dist');
    log.info(`Copying dist files
    from: ${chalk.gray(src)} 
    to: ${chalk.gray(dest)}`);
    await fs.copy(src, dest);
}

async function copyIconFiles(cwd) {
    const src = path.join(__dirname, '../../desktop/wallet/assets/icons');
    const dest = path.join(__dirname, '../../desktop/wallet/dist/');
    log.info(`Copying icon files
    from: ${chalk.gray(src)} 
    to: ${chalk.gray(dest)}`);
    await fs.copy(src, dest);
    await fs.copy(src, path.join(dest, './icons'));
}
async function copyFontFiles(cwd) {
    const src = path.join(__dirname, '../../desktop/wallet/assets/fonts');
    const dest = path.join(__dirname, '../../desktop/wallet/dist/');
    log.info(`Copying icon files
    from: ${chalk.gray(src)} 
    to: ${chalk.gray(dest)}`);
    await fs.copy(src, dest);
    await fs.copy(src, path.join(dest, './fonts'));
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
    await cleanDistFiles(cwd);
    await copyDistFiles(cwd);
    await copyIconFiles(cwd);
    await copyFontFiles(cwd);
    await updateBaseHref(cwd);
}

module.exports = build;
