module.exports = {
  input: "./src/index.ts",
  output: {
    moduleName: "b$",
    fileName: "burstjs[min].js",
    format: ["iife", "iife-min"],
    dir: "./dist"
  },
  extendRollupConfig: (conf) => {
    conf.inputConfig.preserveSymlinks = true;
    return conf
  },
  env: {
    NODE_ENV: "production"
  },
  plugins: {
    ['node-resolve'] : {
      jsnext: true,
      preferBuiltins: true,
      browser:true
    },
    commonjs: {
      namedExports: {
        'crypto-js': [
          'enc',
          'SHA256',
          'AES',
          'lib'
        ],
        '@burstjs/crypto': [
          'generateSignature',
          'verifySignature',
          'generateSignedTransactionBytes',
          'encryptMessage',
          'getAccountIdFromPublicKey'
        ],
        '@burstjs/contracts': [
          'generateContract',
          'calculateMinimumCreationFee',
          'generateMethodCall'
        ],
        '@burstjs/util': [
          'asyncRetry',
          'FeeQuantPlanck',
          'convertNumberToNQTString',
          'convertNQTStringToNumber',
          'convertHexStringToDecString',
          'convertHexStringToString',
          'convertNumericIdToAddress',
          'convertAddressToNumericId',
          'convertBase36StringToHexString',
          'convertHexStringToBase36String',
          'isBurstAddress',
        ]
      },
    }
  }
};
