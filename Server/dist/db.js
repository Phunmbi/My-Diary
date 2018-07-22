'use strict';

var database = [];

var uniqueId = function uniqueId() {
  var id = '';
  for (var index = 0; index < 7; index++) {
    id += Math.round(Math.random() * 10);
  }
  return id;
};

var viewOne = function viewOne(id) {
  for (var index = 0; index < database.length; index++) {
    if (database[index].id === id) {
      return database[index];
    }
  }
};

var addOne = function addOne(newEntry) {
  newEntry.id = uniqueId();
  database.push(newEntry);
  return database;
};

var viewAll = function viewAll() {
  return database;
};

var modifyOne = function modifyOne(entry) {
  for (var index = 0; index < database.length; index++) {
    if (database[index].id === entry.id) {
      database.splice(index, 1, entry);
      return database[index];
    }
  }
};

var deleteOne = function deleteOne(id) {
  for (var index = 0; index < database.length; index++) {
    if (database[index].id === id) {
      database.splice(index, 1);
    }
  }
  return database;
};

module.exports = {
  database: database,
  addOne: addOne,
  viewOne: viewOne,
  viewAll: viewAll,
  modifyOne: modifyOne,
  deleteOne: deleteOne
};
//# sourceMappingURL=db.js.map