import { Client } from 'pg';

require('dotenv').config();

const connectionString = 'postgresql://postgres:Birthdays262314@localhost:5432/MyDiary';

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