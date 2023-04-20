import mongoose from 'mongoose';
import { config } from './config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('database');

export default () => {
  const connect = () => {
    console.log(`Database URL test:${config.DATABASE_URL}`);
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info('database connected');
      })
      .catch((error) => {
        log.error('error while trying to connect to database:', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
