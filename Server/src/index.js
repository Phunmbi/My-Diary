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

// Specify port
const port = process.env.PORT || 3000;

app.server.listen(port, () => {
  console.log('started listening in on port 3000');
});

export default app;