const spawn = require('cross-spawn');

const STDIO_OPTIONS = {stdio: 'inherit'};

module.exports = (cmd, args, opts = STDIO_OPTIONS ) => new Promise((resolve, reject) => {
    console.log(`Executing [${cmd} ${args.join(" ")}]`);
    const process = spawn(cmd, args, opts);
    process.on('close', (code) => {
        if (code !== 0) {
            reject("Ooops, something failed");
        }
        else {
            resolve();
        }
    })
});

