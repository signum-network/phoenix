module.exports = {
  input: "./src/index.ts",
  output: {
    moduleName: "b$",
    fileName: "burstjs[min].js",
    format: ["iife", "iife-min"],
    dir: "./dist"
  },
  env: {
    NODE_ENV: "production"
  },
  onwarn: (warning, warn) => {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning); // this requires Rollup 0.46
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
          'encryptMessage'
        ],
        '@burstjs/util': [
          'convertNumberToNQTString',
          'convertNQTStringToNumber',
        ]
      },
    }
  }
};
