const { MongoClient } = require('mongodb');
const logger = require('../utils/serverErrorLogger');

let dbClient;
let db;

// create database connection
const connectWithMongodb = (callback) => {
  MongoClient.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 60000,
    tls: process.env.NODE_ENV === 'production',
    poolSize: 100,
  })
    .then((client) => {
      dbClient = client;
      db = dbClient.db(process.env.DB_NAME);
      if (callback) {
        callback();
      }
    })
    .catch((error) => {
      logger.error({
        label: 'connectWithMongodb',
        message: error,
      });
    });
};

const getDBClient = () => dbClient;

const getDB = () => db;

module.exports = {
  connectWithMongodb,
  getDBClient,
  getDB,
};
