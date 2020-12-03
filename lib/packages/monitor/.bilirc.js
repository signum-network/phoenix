module.exports = {
  input: "./src/index.ts",
  output: {
    moduleName: "b$monitor",
    fileName: "burstjs.monitor[min].js",
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
