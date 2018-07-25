'use strict';

var database = [{
  id: '123456',
  title: 'Today I met an avocado',
  details: 'Today was a good day, I met an avocado and it made me want to have chips and guacamole for dinner'
}, {
  id: '234612',
  title: 'Shitty day at work',
  details: 'Had a cliet go bezerk on me at work today, really got to get better at managing expectations.'
}, {
  id: '786833',
  title: 'Happy day, should celebrate',
  details: 'Finally copped my udacity nanodegree. awesome day to be alive.'
}];

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
  return database[database.length - 1];
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