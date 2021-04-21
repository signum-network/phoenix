
function parseArgs() {
    const args = {
        isLoggingEnabled: false,
        isDevToolsEnabled: false,
    }
    process.argv.forEach(function (val, index, array) {
        if (val === '--log'){
            args.isLoggingEnabled = true
        }
        if (val === '--devtools'){
            args.isDevToolsEnabled = true
        }
    });

    return args;
}

module.exports = {
    parseArgs
}
