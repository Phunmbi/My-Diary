'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var router = (0, _express.Router)();

// api routes v1 (/v1)

// /entries api, get all entries
router.get('/entries', (req, res) => {
  res.json(_db2['default'].viewAll());
});

// get specific entry
router.get('/entries/:id', (req, res) => {
  var reply = _db2['default'].viewOne(req.params.id);
  res.json(reply);
});

// add an entry
router.post('/entries', (req, res) => {
  _db2['default'].addOne(req.body);
  res.json({ message: 'New entry added' });
});

// edit an entry
router.put('/entries/:id', (req, res) => {
  req.body.id = req.params.id;
  _db2['default'].modifyOne(req.body);
  res.json({ message: 'Entry updated successfully' });
});

// delete an entry#
router['delete']('/entries/:id', (req, res) => {
  var entry = req.params.id;
  _db2['default'].deleteOne(entry);
  res.json({ message: 'This entry has been removed' });
});

exports['default'] = router;
//# sourceMappingURL=index.js.map