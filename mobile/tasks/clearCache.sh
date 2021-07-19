#!/bin/bash

watchman watch-del-all
rm -rf "$TMPDIR"/react-native-packager-cache-*
rm -rf "$TMPDIR"/metro-bundler-cache-*
npm start -- --reset-cache
