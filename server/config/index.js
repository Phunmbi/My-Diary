import dotenv from 'dotenv';

dotenv.config();

const test = process.env.TEST_DB_URL;
const env = process.env.NODE_ENV;

let config;

if (env) {
  config = test;
}

export { config };