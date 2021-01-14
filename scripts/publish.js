const args = require('args');
const chalk = require('chalk');
const log = require('./log');
const publishDesktop = require('./publish/publishDesktop')

args.option("desktop", "Publishes desktop version");

const options = args.parse(process.argv);
const cwd = process.cwd();
(async function () {
  try {

    if(options.desktop){
      await publishDesktop({cwd})
    }
    // if (!options.nightly) {
    //   log.error("Currently, only bumping nightly version is supported");
    //   process.exit(0)
    // }

    // const newVersion = await versionNightly();
  } catch (e) {
    log.error(e);
    process.exit(-1);
  }
})();



