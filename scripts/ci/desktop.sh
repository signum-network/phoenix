#!/bin/bash

docker run --rm \
    --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS|APPVEYOR_|CSC_|_TOKEN|_KEY|AWS_|STRIP|BUILD_') \
    -v ${PWD}:/project \
    -v ~/.cache/electron:/root/.cache/electron \
    -v ~/.cache/electron-builder:/root/.cache/electron-builder \
    electronuserland/builder:wine \
/bin/bash -c "
npm install -g @angular/cli && \
echo Installing script runner deps
cd scripts && \
npm install && \
echo Building BurstJS
cd ../lib && \
npm install && \
npm run bootstrap && \
echo Building Desktop Wallet
cd ../desktop/wallet && \
npm install && \
npm run release:all"

