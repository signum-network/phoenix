module.exports = {
  input: "./src/index.ts",
  output: {
    moduleName: "b$crypto",
    fileName: "burstjs.crypto[min].js",
    format: ["iife", "iife-min"],
    dir: "./dist"
  },
  env: {
    NODE_ENV: "production"
  },
  plugins: {
    commonjs: {
      namedExports: {
        'crypto-js': [
          'enc',
          'SHA256',
          'AES',
          'lib'
        ]
      }
    }
  }
};
