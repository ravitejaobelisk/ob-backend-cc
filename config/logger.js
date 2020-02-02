const appRoot = require('app-root-path');
const winston = require('winston');

/**
 * Custom logger for OB Backend
 */
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
    new winston.transports.File({
      filename: `${appRoot}/logs/ob-post-cc-error.log`,
      level: 'error'
    }),
    new winston.transports.File({
      filename: `${appRoot}/logs/ob-post-cc-combined.log`
    })
  ]
});

/**
 * Creating the stream to pipe to app logger (morgan)
 */
logger.stream = {
  write(message, encoding) {
    logger.info(message);
  }
};

/**
 * Also log to terminal in non-prod environments
 */
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
