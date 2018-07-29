import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes/index';
import { startDb } from './models/db';

// Setup Server
const app = express();
app.server = http.createServer(app);

// Start up PostgreSQL database
startDb();

app.use(logger('dev'));
// Middleware
// parse application/json
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json({ message: 'Welcome to the MyDiary APIs' }));

// Api routes v1
app.use('/api/v1', routes);

app.all('/*', (req, res) => {
  res.status(404).json({
    status: res.statusCode,
    message: 'Error, Page not found'
  });
});

// Specify port
const PORT = process.env.PORT || 3000;

app.server.listen(PORT, () => {
  console.log(`started listening in on port 3000 ${PORT}`);
});

export default app;
