const database = [];

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
  return database;
};

const viewAll = () => {
  return database;
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

module.exports.database = database;
module.exports.addOne = addOne;
module.exports.viewOne = viewOne;
module.exports.viewAll = viewAll;
module.exports.modifyOne = modifyOne;
module.exports.deleteOne = deleteOne;

// let key = {
//   id: '689473',
//   title: 'Breathe',
//   details: 'life goes on'
// };

// const age = {
//   id: '808730',
//   title: 'greetings',
//   details: 'greetings boys and girls'
// };

// database.push(key);
// database.push(age);

// key = {
//   id: '689473',
//   title: 'Breathe',
//   details: 'had a fire conversation'
// };

// modifyOne(key);
// console.log(database);