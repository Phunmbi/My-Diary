'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// This code was written based off this tutorials from Net Ninja and Devslopes
// https://www.youtube.com/playlist?list=PL4cUxeGkcC9jBcybHMTIia56aV21o2cZ8
// https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp
var router = (0, _express.Router)();

// api routes v1 (/v1)

// /entries api, get all entries
router.get('/entries', function (req, res) {
  res.json({
    data: _db2['default'].viewAll(),
    status: res.statusCode,
    message: 'Entire database'
  });
});

// get specific entry
router.get('/entries/:id', function (req, res) {
  var reply = _db2['default'].viewOne(req.params.id);
  res.json({
    data: reply,
    status: res.statusCode,
    message: 'Single Entry'
  });
});

// add an entry
router.post('/entries', function (req, res) {
  var result = _db2['default'].addOne(req.body);
  res.json({
    data: result,
    status: res.statusCode,
    message: 'New entry added'
  });
});

// edit an entry
router.put('/entries/:id', function (req, res) {
  req.body.id = req.params.id;
  _db2['default'].modifyOne(req.body.id);
  res.json({
    data: req.body,
    status: res.statusCode,
    message: 'Entry updated successfully'
  });
});

// delete an entry
router['delete']('/entries/:id', function (req, res) {
  var entry = req.params.id;
  _db2['default'].deleteOne(entry);
  res.json({
    data: _db2['default'].database,
    status: res.statusCode,
    message: 'This entry has been removed'
  });
});

exports['default'] = router;
//# sourceMappingURL=index.js.map