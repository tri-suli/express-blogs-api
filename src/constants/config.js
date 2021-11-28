import dotenv from "dotenv";

dotenv.config();

const configs = {
  app: {
    env: process.env.APP_ENV || 'production',
    name: process.env.APP_NAME || 'Blogs',
    port: process.env.APP_PORT || 3000,
  },
  db: {
    production: {
      host: process.env.MONGODB_ATLAS_DB_HOST,
      port: process.env.MONGODB_ATLAS_DB_PORT,
      name: process.env.MONGODB_ATLAS_DB_NAME,
      user: process.env.MONGODB_ATLAS_DB_USER,
      pass: process.env.MONGODB_ATLAS_DB_PASSWORD,
    },
    local: {
      auth: process.env.DB_AUTH || 'admin',
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 27017,
      name: process.env.DB_NAME || 'blogs',
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
    }
  }
};

export default configs;
