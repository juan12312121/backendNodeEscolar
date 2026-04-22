const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const { method, url, body, query, params } = req;
  const start = Date.now();

  logger.info(`Incoming Request: ${method} ${url}`, {
    body: method !== 'GET' ? body : undefined,
    query,
    params
  });

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`Response Sent: ${method} ${url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
  });

  next();
};

module.exports = requestLogger;
