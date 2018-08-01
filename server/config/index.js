require('dotenv').config();

const dev = process.env.DATABASE_URL;
const test = process.env.TEST_DB_URL;
const env = process.env.NODE_ENV;

let config;

if (env) {
  config = test;
} else {
  config = dev;
}

export { config };