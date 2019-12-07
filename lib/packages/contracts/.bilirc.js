module.exports = {
  input: "./src/index.ts",
  output: {
    moduleName: "b$http",
    fileName: "burstjs.contracts[min].js",
    format: ["iife", "iife-min"],
    dir: "./dist"
  },
  env: {
    NODE_ENV: "production"
  },
  plugins: {
    ['node-resolve'] : {
      jsnext: true,
      preferBuiltins: true,
      browser:true
    }
  }
};
