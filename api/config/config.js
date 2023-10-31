require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  dbLocalUrl: process.env.DATABASE_LOCAL_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  appPassword: process.env.APP_PASSWORD,
  email: process.env.EMAIL
}

module.exports = { config };
