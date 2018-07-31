import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes/index';
import { startDb } from './models/db';
import { createEntriesTable, createUsersTable } from './models/schema';

// Setup Server
const app = express();
app.server = http.createServer(app);

// Start up PostgreSQL database
startDb();
createUsersTable();
createEntriesTable();

// Initiate Morgan logger
app.use(logger('dev'));

// Middleware
// parse application/json
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

// Api routes v1
app.get('/', (req, res) => res.json({ message: 'Welcome to the MyDiary APIs' }));
app.use('/api/v1', routes);
app.all('/*', (req, res) => {
  res.status(404).json({
    status: res.statusCode,
    message: 'Error, Page not found'
  });
});

// Specify port
const PORT = process.env.PORT || 3000;

// Listen on specified port
app.server.listen(PORT, () => {
  console.log(`started listening in on port ${PORT}`);
});

export default app;