const exep = require('../execAsync');

const expectedSubPath = '/web/angular-wallet';

async function build({type, cwd}){
    if(cwd.indexOf(expectedSubPath) === -1){
        throw `You must not call this command in another directory than ${expectedSubPath}`
    }
    await exep('ng', ['build', '--prod'] );
}

module.exports = build;
