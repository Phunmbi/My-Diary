import { client } from './db';

const entriesTable = 'CREATE TABLE IF NOT EXISTS entries' + ' (entryid SERIAL PRIMARY KEY NOT NULL,' + 'email CHARACTER VARYING(40) NOT NULL,' + 'title CHARACTER VARYING(200) NOT NULL,' + 'details CHARACTER VARYING(10000) NOT NULL,' + 'last_time_edited TIMESTAMP NOT NULL DEFAULT (NOW()),' + 'userid INTEGER NOT NULL REFERENCES users(userid)' + ')';
const usersTable = 'CREATE TABLE IF NOT EXISTS users' + ' (userid SERIAL PRIMARY KEY NOT NULL,' + 'firstName CHARACTER VARYING(20) NOT NULL,' + 'lastName CHARACTER VARYING(20) NOT NULL,' + 'email CHARACTER VARYING(40) UNIQUE NOT NULL,' + 'password CHARACTER VARYING(200) NOT NULL' + ')';

const createEntriesTable = () => {
  client.query(entriesTable, (err, res) => {
    if (err) {
      console.log(err.stack);
    }
  });
};

const createUsersTable = () => {
  client.query(usersTable, (err, res) => {
    if (err) {
      console.log(err.stack);
    }
  });
};

export { createEntriesTable, createUsersTable };