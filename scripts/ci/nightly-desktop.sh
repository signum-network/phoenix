#!/bin/bash

echo ===============================
echo Nightly Release Desktop Wallet
echo ===============================

npm i @angular/cli -g

# sync nightly with latest stuff
git checkout develop
git pull
git checkout nightly
git merge develop

# install script deps
echo
cd ./scripts
npm i

# install/update version of burstjs
cd ../lib
npm install
npm run bootstrap

# install/update angular wallet deps
cd ../web/angular-wallet
npm i

# install/update desktop wallet deps
cd ../../desktop/wallet
npm install

git tag nightly --force
git push --tags --force

# only builds, but not publish
npm run release:all

# electron builder bumps version of package.json - this is no good for nightly builds
#electron-builder -p "always"

# need to run a current release
echo "TODO: release the artifacts manually"


