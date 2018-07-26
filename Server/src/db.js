import { Client } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:Birthdays262314@localhost:5432/MyDiary';

const client = new Client({ connectionString });

const startDb = () => {
  client.connect();
  return client;
};

const database = [{
  id: '123456',
  title: 'Today I met an avocado',
  details: 'Today was a good day, I met an avocado and it made me want to have chips and guacamole for dinner'
},
{
  id: '234612',
  title: 'Shitty day at work',
  details: 'Had a cliet go bezerk on me at work today, really got to get better at managing expectations.'
},
{
  id: '786833',
  title: 'Happy day, should celebrate',
  details: 'Finally copped my udacity nanodegree. awesome day to be alive.'
}
];

const uniqueId = () => {
  let id = '';
  for (let index = 0; index < 7; index++) {
    id += Math.round(Math.random() * 10);
  }
  return id;
};

const viewOne = (id) => {
  for (let index = 0; index < database.length; index++) {
    if (database[index].id === id) {
      return database[index];
    }
  }
};

const addOne = (newEntry) => {
  newEntry.id = uniqueId();
  database.push(newEntry);
  return database[database.length - 1];
};

const viewAll = (callback) => {
  client.query('SELECT * FROM public.entries', (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      callback(res.rows);
    }
  });
};

const modifyOne = (entry) => {
  for (let index = 0; index < database.length; index++) {
    if (database[index].id === entry.id) {
      database.splice(index, 1, entry);
      return database[index];
    }
  }
};

const deleteOne = (id) => {
  for (let index = 0; index < database.length; index++) {
    if (database[index].id === id) {
      database.splice(index, 1);
    }
  }
  return database;
};

export {
  startDb,
  database,
  addOne,
  viewOne,
  viewAll,
  modifyOne,
  deleteOne
};