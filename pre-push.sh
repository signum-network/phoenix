#!/usr/bin/env bash

check () {
    if [ $? -ne 0 ]; then
        echo "Damn, did not work!"
        exit 1
    fi
}

cd ./lib
npm run tsc
npm run test
check
cd ./web/angular-wallet
#npm run test
check
npm run build:ci
