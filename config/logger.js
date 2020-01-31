const appRoot = require('app-root-path');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'ob-post-cc' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new winston.transports.File({
      filename: `${appRoot}/logs/ob-post-cc-error.log`,
      level: 'error'
    }),
    new winston.transports.File({
      filename: `${appRoot}/logs/ob-post-cc-combined.log`
    })
  ]
});

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  }
};

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );
}

module.exports = logger;
