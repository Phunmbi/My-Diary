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

module.exports = {
  database,
  addOne,
  viewOne,
  viewAll,
  modifyOne,
  deleteOne
};
