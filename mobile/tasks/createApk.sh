#!/bin/bash

react-native bundle --platform android --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res

sleep 2

cd android

./gradlew clean
./gradlew assembleRelease -x bundleReleaseJsAndAssets -PMYAPP_UPLOAD_STORE_FILE=signum-network.jks \
  -PMYAPP_UPLOAD_STORE_PASSWORD="$1" \
  -PMYAPP_UPLOAD_KEY_ALIAS="$2" \
  -PMYAPP_UPLOAD_KEY_PASSWORD="$3" \

jarsigner -verify -verbose -certs ./app/build/outputs/apk/release/app-release.apk
