const express = require('express');
const fs = require('fs');
const { resolve } = require('path');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./utils/serverErrorLogger');
const { connectWithMongodb } = require('./database/connection');

const server = express();

const isProduction = process.env.NODE_ENV === 'production';

// server exception handling
process.on('uncaughtException', (error) => {
  logger.error({
    label: 'uncaughtException',
    message: error.stack,
  });

  process.exit(1);
});

// server rejection handling
process.on('unhandledRejection', (error) => {
  logger.error({
    label: 'unhandledRejection',
    message: error.stack,
  });
});

if (isProduction && fs.existsSync(__dirname, '../client/build')) {
  server.use(express.static(resolve(__dirname, '../client/build')));
}

// important middleware
server
  // enable cors for server, Access-Control-Allow-Origin: *
  .use(cors({
    origin: isProduction ? process.env.SITE_ORIGIN : '*',
    optionsSuccessStatus: 200,
  }))
  // secure the server with headers
  .use(helmet({ contentSecurityPolicy: false }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// api route mapping
server.use('/api/v1', require('./routes/urlConfig')(require('./routes/api'), __dirname));

// Handle React routing application only for production environment
if (isProduction) {
  server.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '../client/build/index.html'));
  });
}

// catch 404 and forward to error handler
server.use((req, res) => {
  res.status(404).send("Sorry can't find that api!");
});

// establish database connection
connectWithMongodb(() => {
  console.log('database connected');
});

module.exports = server;
