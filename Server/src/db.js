const database = new Map();

const viewOne = (id) => {
  database.get(id);
};

var addone = (newEntry) => {
  return database.set(database.size + 1, newEntry);
}

const viewAll = () => {
  let allEntries = [...database.entries()]
  console.log(allEntries)
  return allEntries;
};

const addOne = (newEntry) => {
  return database.set(database.size+1, newEntry);
}

// const modifyOne =(id) =>{
//     for (let entry of database) {
//         if(entry.id === id){
//             database.delete(entry);
//             database.add()
//         }
//     }
// }

const deleteOne = (id) => {
  return database.delete();
};

module.exports = {
  database: database,
  viewOne: viewOne,
  viewAll: viewAll,
  addOne: addOne,
  // modifyOne : modifyOne,
  deleteOne: deleteOne
};


var age = {
  'title': 'meet me',
  'details': 'Oh well let me be woman!'
}

var key = {
  'title': 'i met a girl!',
  'details': 'i think i finally met the one'
}

addone(key)
addone(age)
viewAll()
console.log(database)