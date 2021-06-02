module.exports = {
    input: "./src/index.ts",
    output: {
        moduleName: "sig$contracts",
        fileName: "signumjs.contracts[min].js",
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
        ['node-resolve']: {
            jsnext: true,
            preferBuiltins: true,
            browser: true
        },
        commonjs: {
            namedExports: {
                '@signumjs/util': [
                    'Amount',
                    'FeeQuantPlanck',
                    'OneSignaPlanck',
                    'convertHexStringToDecString',
                    'convertDecStringToHexString',
                    'convertHexStringToString',
                    'convertHexEndianess',
                    'convertHexStringToByteArray',
                    'convertByteArrayToHexString'
                ]
            },
        },
    }
};
