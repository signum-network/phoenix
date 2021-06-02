module.exports = {
  input: "./src/index.ts",
  output: {
    moduleName: "sig$",
    fileName: "signumjs[min].js",
    format: ["umd", "umd-min"],
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
        '@signumjs/crypto': [
          'generateSignature',
          'verifySignature',
          'generateSignedTransactionBytes',
          'encryptMessage',
          'getAccountIdFromPublicKey'
        ],
        '@signumjs/contracts': [
          'generateContract',
          'calculateMinimumCreationFee',
          'generateMethodCall'
        ],
        '@signumjs/util': [
          'asyncRetry',
          'Amount',
          'FeeQuantPlanck',
          'convertNumberToNQTString',
          'convertNQTStringToNumber',
          'convertHexStringToDecString',
          'convertHexStringToString',
          'convertBase36StringToHexString',
          'convertHexStringToBase36String',
        ]
      },
    }
  }
};
