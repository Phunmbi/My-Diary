import { Client } from 'pg';
import { config } from '../config/index';

require('dotenv').config();

const connectionString = config || process.env.DATABASE_URL;

console.log(connectionString);
const client = new Client({ connectionString });

const startDb = () => {
  client.connect((err) => {
    if (err) {
      console.log(err);
    }
    console.log('connected succesfully');
  });
};

export { startDb, client };