'use strict';

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const Sequelize = require('../api/sequelize');
const cors = require('cors');

const db = require('./db');
const { Course, User } = db.sequelize.models;

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

const app = express();

app.use(cors());

// set our port
var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

// IIFE
(async () => {
  try {
    // test connection to the database
    await db.sequelize.authenticate()
      .then(() => {
        console.log('Connection to the database has been successful.');
        app.listen(app.get('port'), () => {
          console.log(`Express server is listening on port ${port}`);
        });
      });

  } catch (err) {
    console.error('Failed to connect to database: ' + err);
  }
})();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// a built-in middleware function in Express that parses incoming requests with JSON payloads
app.use(express.json());

// TODO setup your api routes here
app.use('/api', routes);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}