const args = require('args');
const chalk = require('chalk');
const buildDesktop = require('./build/buildDesktop');
const buildWeb = require('./build/buildWeb');

const log = require('./log');

const Targets = {
    desktop: buildDesktop,
    web: buildWeb,
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

args.option("target", "The target ", 'web', validateType);

const options = args.parse(process.argv);
const cwd = process.cwd();
(async function () {
    try {
        log.info(`Building Phoenix for [${chalk.bold.yellow(options.target)}]...`);
        const buildFn = Targets[options.target];
        await buildFn({
            ...options,
            cwd
        });
        log.success('Finished');
    } catch (e) {
        log.error(e);
        process.exit(-1);
    }
})();



