const path = require('path');
const fs = require('fs-extra');
const log = require('../log');

async function bumpNightlyVersion(packageJsonPath){
  let packageJson = await fs.readJson(packageJsonPath);

  const {version} = packageJson;
  if(version.endsWith('nightly')){
    return version;
  }
  packageJson.version =  `${version}-nightly`;
  await fs.writeJson(packageJsonPath, packageJson, {
    spaces: 2
  });
  return packageJson.version
}

async function version() {
  const desktopPackageJsonPath = path.join(__dirname, '../../desktop/wallet/package.json');
  const webPackageJsonPath = path.join(__dirname, '../../web/angular-wallet/package.json');
  await bumpNightlyVersion(desktopPackageJsonPath);
  return await bumpNightlyVersion(webPackageJsonPath);
}

module.exports = version;

