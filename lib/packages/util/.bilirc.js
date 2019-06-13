module.exports = {
  input: "./src/index.ts",
  output: {
    moduleName: "b$util",
    fileName: "burstjs.util[min].js",
    format: ["iife", "iife-min"],
    dir: "./dist"
  },
  env: {
    NODE_ENV: "production"
  }
};
