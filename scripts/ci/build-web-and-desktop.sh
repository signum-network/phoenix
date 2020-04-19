#!/usr/bin/env bash
echo
echo ==================================
echo "Building Wallet for Desktop & Web"
echo ==================================
echo
source ./scripts/ci/get-version.sh

## install script deps
cd scripts
npm install

echo ----------------------------------
echo "Building BurstJS"
echo ----------------------------------
cd ../lib
npm install
npm run bootstrap

## install angular deps
cd ../web/angular-wallet
npm install

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
WEB_ARCHIVE="web-phoenix-burst-wallet.${PACKAGE_VERSION}.tar.gz"
npm run build:web
echo "Archiving..."
cd dist
tar cfz ${WEB_ARCHIVE} *
echo "Moving..."
cd ../../../
mkdir deploy
mv ./desktop/wallet/release-builds/linux-phoenix* ./deploy
mv ./desktop/wallet/release-builds/mac-phoenix* ./deploy
mv ./desktop/wallet/release-builds/win-phoenix* ./deploy
mv "./web/angular-wallet/dist/${WEB_ARCHIVE}" ./deploy
