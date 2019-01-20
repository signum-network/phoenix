const args = require('args');
const chalk = require('chalk');
const log = require('./log');

const Targets = {
    ng: require('./version/versionNg'),
    ios: () => log.error("iOS version not implemented yet"),
    android: () => log.error("Android version not implemented yet"),
};

const AllowedTargets = Object.keys(Targets);

function validateType(v) {

    if (!v || v === '') return v;

    if (AllowedTargets.indexOf(v) === -1) {
        console.error(`Unknown target type [${v}], allowed are:\n`);
        AllowedTargets.forEach(t => console.error(`\t- ${t}`));
        process.exit(-1);
    }
    return v;
}

args.option("target", "The target ", 'ng', validateType);

const options = args.parse(process.argv);
(async function () {
    try {
        log.info(`Updating Phoenix Version for [${chalk.bold.yellow(options.target)}]...`);
        const versionFn = Targets[options.target];
        await versionFn(options);
        log.success('Finished');
    } catch (e) {
        log.error(e);
        process.exit(-1);
    }
})();



