/* eslint-disable */
var assert = require('assert');
var db = require('../Server/src/db');

var entry = {
  id: '456353',
  title: 'Today i met an avocado',
  details: 'I wanted to make new friends.'
};

var keys = {
  id: '657432',
  title: 'Met a goddess',
  details: 'It didnt end well'
};

let oldSize = db.database.length;

describe('#Testing operations on database', () => {
  describe('#Should add one to database size', () => {
    it('#should return the same set size after addition', () => {
      assert.equal(db.addOne(entry).length - 1, oldSize);
    });
  });

  describe('#Should view one entry', () => {
    it('#Should return the same entry', () => {
      assert.equal(db.viewOne(entry.id), entry);
    });
  });

  describe('#Should view all entries', () => {
    it('#Should return the same entries', () => {
      db.addOne(keys);
      assert.equal(db.viewAll(), db.database)
    })
  })

  describe('#Should change an entry', () => {
    it('Should return the modified array', () => {
      var values = {
        id: '123456',
        title: 'stay',
        details: 'stay clear people'
      }
      db.database.push(values);
      var values = { id: "123456", title: "Met a goddess", details: "She agreed to marry me." };
      assert.equal(db.modifyOne(values), values);
    })
  })

  describe('#Should delete one from database size', () => {
    it('#Should return the same array length after and deleting', () => {
      assert.equal(db.deleteOne(entry.id).length, 2);
    });
  });
});