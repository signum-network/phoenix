const chalk = require('chalk');

module.exports = {
    success: (msg) => console.log(chalk.bold.green('[OK]'), msg),
    error: (msg) => console.log(chalk.bold.red('[FAIL]'), msg),
    info: (msg) => console.log(chalk.bold.blueBright('[INFO]'), msg),
};

