#!/bin/bash

# usage: testDeeplink.sh <your-deeplink>
# keep in mind that `&` needs to be escaped
#                                 VV
# Example: ./testDeeplink.sh 'signum://v1?action=pay\&payload=eyJyZWNpcGllbnQiOiJTLTlLOUwtNENCNS04OFk1LUY1RzRaIiwiYW1vdW50UGxhbmNrIjoxMDAwMDAwMCwiZmVlUGxhbmNrIjo3MzUwMDAsIm1lc3NhZ2UiOiJIaSwgZnJvbSBhIGRlZXAgbGluayIsIm1lc3NhZ2VJc1RleHQiOnRydWUsImltbXV0YWJsZSI6ZmFsc2UsImRlYWRsaW5lIjoyNCwiZW5jcnlwdCI6ZmFsc2V9

adb shell am start -W -a android.intent.action.VIEW -d "$1"
