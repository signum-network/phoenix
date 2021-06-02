module.exports = {
  input: "./src/index.ts",
  output: {
    moduleName: "sig$monitor",
    fileName: "signumjs.monitor[min].js",
    format: ["umd", "umd-min"],
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
