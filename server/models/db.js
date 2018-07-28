import { Client } from 'pg';

require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const client = new Client({ connectionString });

const startDb = () => {
  client.connect((err) => {
    console.log('connected succesfully');
  });
  return client;
};

export { startDb, client };