const exep = require('../execAsync');

function navigateToAngularWalletDir()
{
    const angularWalletPath = path.join(__dirname, '../../web/angular-wallet');
    process.chdir(angularWalletPath);

}

async function build({type, cwd}){
    navigateToAngularWalletDir();
    await exep('ng', ['build', '--prod'] );
    process.chdir(cwd);
}

module.exports = build;
