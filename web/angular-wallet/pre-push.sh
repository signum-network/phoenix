#!/usr/bin/env bash

check () {
    if [ $? -ne 0 ]; then
        echo "$1: $error"
        exit 1
    fi
}

cd ../../lib
npm run tsc
npm run test
check
cd ../web/angular-wallet
npm run test
check
ng build --aot --source-map=false
