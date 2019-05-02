const args = require('args');
const chalk = require('chalk');
const log = require('./log');
const versionNightly = require('./version/versionNightly');

args.option("nightly", "Indicates a nightly build");

const options = args.parse(process.argv);
(async function () {
  try {
    if (!options.nightly) {
      log.error("Currently, only bumping nightly version is supported");
      process.exit(0)
    }
    log.info('Bumping nightly version string to wallet');
    const newVersion = await versionNightly();
    log.success(`Bumped Phoenix Version as [${chalk.bold.yellow(newVersion)}]`);
  } catch (e) {
    log.error(e);
    process.exit(-1);
  }
})();



