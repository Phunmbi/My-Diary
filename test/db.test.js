/* eslint-disable */
var assert = require('assert');
var db = require('../Server/src/db');

// describe('Array', () => {
//   describe('#indexOf()', () => {
//     it('should return -1 when the value is not present', () => {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

const entry = {
  title: 'Today i met an avocado',
  details: 'I wanted to make new friends.'
};

let oldSize = db.database.size;

db.addOne(entry)

console.log(oldSize, db.deleteOne(entry), db.database.size)

describe('#Testing operations on database', () => {
  describe('#Should add one to database size', () => {
    it('#should return the same set size after addition', () => {
      assert.equal(oldSize, db.addOne(entry).size - 1);
    });
  });

  describe('#Should delete one from database size', () => {
    it('#Should return the same set size after deletion', () => {
      db.addOne(entry);
      db.deleteOne(entry);
      let newSize = db.database.size
      assert.equal(oldSize, newSize)
    });
  });

  describe(should )
});