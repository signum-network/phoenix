const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const exec = require('../execAsync');
const log = require('../log');

const expectedSubPath = '/web/angular-wallet';

async function copyDistFiles(cwd){
    const src = path.join(cwd, './dist/angular-wallet');
    const dest = path.join(cwd, '../../desktop/wallet/dist');
    log.info(`Copying dist files
    from: ${chalk.gray(src)} 
    to: ${chalk.gray(dest)}`);
    await fs.copy(src, dest);
}

async function build({target, cwd}){
    if(cwd.indexOf(expectedSubPath) === -1){
        throw `You must not call this command in another directory than '<phoenix_root>/${expectedSubPath}'`
    }
    await exec('ng', ['build', '--prod'] );

    await copyDistFiles(cwd);
}

module.exports = build;
