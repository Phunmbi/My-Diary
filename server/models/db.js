import { Client } from 'pg';

const connectionString = 'postgresql://postgres:Birthdays262314@localhost:5432/MyDiary';

const client = new Client({ connectionString });

const startDb = () => {
  client.connect((err) => {
    console.log('connected succesfully');
  });
  return client;
};

export { startDb, client };