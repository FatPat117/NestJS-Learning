export const appConfig = () => ({
  environment: process.env.NODE_ENV || 'production',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432'),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'nestjs-blog',
    synchronize: process.env.DATABASE_SYNCHRONIZE == 'true' ? true : false,
    autoLoad: process.env.DATABASE_AUTOLOAD == 'true' ? true : false,
  },
});
