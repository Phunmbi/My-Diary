import { client } from './db';

const usersTable = 'CREATE TABLE IF NOT EXISTS users' + ' (id SERIAL PRIMARY KEY NOT NULL,' + 'first_Name CHARACTER VARYING(20) NOT NULL,' + 'last_Name CHARACTER VARYING(20) NOT NULL,' + 'email CHARACTER VARYING(40) UNIQUE NOT NULL,' + 'password CHARACTER VARYING(200) NOT NULL,' + 'reminder CHARACTER VARYING(6)' + ')';
const entriesTable = 'CREATE TABLE IF NOT EXISTS entries' + ' (id SERIAL PRIMARY KEY NOT NULL,' + 'title CHARACTER VARYING(200) NOT NULL,' + 'details CHARACTER VARYING(10000) NOT NULL,' + 'time_created TIMESTAMP NOT NULL DEFAULT NOW(),' + 'user_id INTEGER NOT NULL REFERENCES users(id)' + ')';

const createUsersTable = () => {
  client.query(usersTable, (err, res) => {
    if (err) {
      console.log(err.stack);
    }
  });
};

const createEntriesTable = () => {
  client.query(entriesTable, (err, res) => {
    if (err) {
      console.log(err.stack);
    }
  });
};

export { createUsersTable, createEntriesTable };