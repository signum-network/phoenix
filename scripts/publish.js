const args = require('args');
const log = require('./log');
const publishDesktop = require('./publish/publishDesktop')

args.option("desktop", "Publishes desktop version");

const options = args.parse(process.argv);

(async function () {
    try {

        if (options.desktop) {
            await publishDesktop()
        } else {
            throw new Error('Only desktop is supported yet')
        }
    } catch (e) {
        log.error(e);
        process.exit(-1);
    }
})();



