#!/usr/bin/env bash
cd ../../lib
npm run test
cd ../web/angular-wallet
npm run test
ng build --aot --source-map=false
