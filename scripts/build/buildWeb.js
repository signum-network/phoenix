const {join} = require('path');
const exep = require('../execAsync');

function navigateToAngularWalletDir() {
  const angularWalletPath = join(__dirname, '../../web/angular-wallet');
  process.chdir(angularWalletPath);
}

async function build({cwd}) {
  navigateToAngularWalletDir();
  await exep('npm', ['run', 'build:web']);
  process.chdir(cwd);
}

module.exports = build;
