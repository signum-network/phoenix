module.exports = {
  input: "./src/index.ts",
  output: {
    moduleName: "b$contracts",
    fileName: "burstjs.contracts[min].js",
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
    ['node-resolve']: {
      jsnext: true,
      preferBuiltins: true,
      browser: true
    },
    commonjs: {
      namedExports: {
        '@burstjs/util': [
          'convertNumberToNQTString',
          'convertNQTStringToNumber',
          'convertHexStringToDecString',
          'convertHexStringToString',
          'convertHexEndianess',
          'convertHexStringToByteArray',
          'convertByteArrayToHexString'
        ]
      },
    },
  }
};
