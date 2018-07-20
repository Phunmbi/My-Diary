'use strict';

var database = [];

var uniqueId = () => {
  var id = '';
  for (var index = 0; index < 7; index++) {
    id += Math.round(Math.random() * 10);
  }
  return id;
};

var viewOne = id => {
  for (var index = 0; index < database.length; index++) {
    if (database[index].id === id) {
      return database[index];
    }
  }
};

var addOne = newEntry => {
  newEntry.id = uniqueId();
  database.push(newEntry);
  return database;
};

var viewAll = () => {
  return database;
};

var modifyOne = entry => {
  for (var index = 0; index < database.length; index++) {
    if (database[index].id === entry.id) {
      database.splice(index, 1, entry);
      return database[index];
    }
  }
};

var deleteOne = id => {
  for (var index = 0; index < database.length; index++) {
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
//# sourceMappingURL=db.js.map