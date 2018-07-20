import 'babel-polyfill';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes/index';

// Setup Server
const app = express();
app.server = http.createServer(app);

// Middleware
// parse application/json
app.use(bodyParser.json({}));

// Api routes v1
app.use('/api/v1', routes);

app.server.listen(process.env.port || 3000);
console.log('started listening in on port 3000');

export default app;