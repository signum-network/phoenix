#!/usr/bin/env bash
echo
echo ==================================
echo "Building Wallet for Desktop & Web"
echo ==================================
echo
source ./scripts/ci/get-version.sh

## install script deps
cd scripts
#npm install
#
echo ----------------------------------
echo "Building BurstJS"
echo ----------------------------------
cd ../lib
#npm install
#npm run bootstrap
#
## install angular deps
cd ../web/angular-wallet
#npm install

echo ----------------------------------
echo "Building Desktop Version"
echo ----------------------------------
cd ../../desktop/wallet
npm install
npm run release:all

echo ----------------------------------
echo "Building Web Version"
echo ----------------------------------
cd ../../web/angular-wallet
TARGET_DIR=../../../desktop/wallet/release-builds/
WEB_ARCHIVE="../web-phoenix-burst-wallet.${PACKAGE_VERSION}.tar.gz"
npm run build:web
echo "Archiving..."
cd dist
tar cfz ${WEB_ARCHIVE} *
echo "Moving..."
mv ${WEB_ARCHIVE} ${TARGET_DIR}

