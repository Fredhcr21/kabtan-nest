import pino from 'pino';
import config from 'src/config/app.interface';

const logger = pino({
  name: config.name,
  level: config.logLevel,
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
      colorize: true,
    },
  },
});

export default logger;
