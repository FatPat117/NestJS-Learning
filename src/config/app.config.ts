import { registerAs } from '@nestjs/config';
import databaseConfig from './database.config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  database: databaseConfig(),
}));
