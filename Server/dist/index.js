'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Specify port
var port = process.env.PORT || 3000;

// Setup Server
var app = (0, _express2['default'])();
app.server = _http2['default'].createServer(app);

// Middleware
// parse application/json
app.use(_bodyParser2['default'].json());

app.get('/', function (req, res) {
  return res.json({
    message: 'Welcome to MyDiary APIs'
  });
});
// Api routes v1
app.use('/api/v1', _index2['default']);

app.server.listen(port, function () {
  console.log('started listening in on port 3000');
});

exports['default'] = app;
//# sourceMappingURL=index.js.map