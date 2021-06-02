module.exports = {
  input: "./src/index.ts",
  output: {
    moduleName: "sig$util",
    fileName: "signumjs.util[min].js",
    format: ["umd", "umd-min"],
    dir: "./dist"
  },
  env: {
    NODE_ENV: "production"
  }
};
