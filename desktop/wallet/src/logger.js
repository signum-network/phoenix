const path = require('path');
const {createLogger, transports, format} = require('winston');

isLoggingEnabled = () => {
  let isEnabled = false;
  process.argv.forEach(function (val, index, array) {
    if (val === '--log'){
      isEnabled = true;
    }
  });
  return isEnabled;
};

const createFilename = (type) => {
  const z = n => n < 10 ? '0' + n : '' + n;

  const date = new Date();
  const YYYY = date.getFullYear();
  const MM = z(date.getMonth() + 1);
  const DD = z(date.getDate());

  return path.join(process.cwd(), `phoenix-${YYYY}${MM}${DD}.${type}.log`)

};

const Noop = () => {};

let logger = {
  log: Noop,
  warn: Noop,
  error: Noop,
  info: Noop
};

if (isLoggingEnabled()) {
  logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.prettyPrint(),
      format.errors({stack: true}),
    ),
    exitOnError: false,
    transports: [
      new transports.File({filename: createFilename('error'), level: 'error', handleExceptions: true}),
      new transports.File({filename: createFilename('combined')})
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }));
  }
}
module.exports = logger;
