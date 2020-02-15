const { MongoClient } = require('mongodb');
const promiseRetry = require('promise-retry');

const connectWithRetry = (url, retriesNumber, retriesInterval) => {
  const retryOptions = {
    retries: retriesNumber,
    minTimeout: retriesInterval,
  }

  return promiseRetry((retry, attemptNumber) => {
    console.log(`Connection attempt: ${attemptNumber}`)
    return MongoClient.connect(url).catch(retry)
  }, retryOptions);
}

const retriesNumber = 10;
const retriesInterval = 10000;

const connectToMongoDb = (connectionUrl, dbName) =>
  connectWithRetry(connectionUrl, retriesNumber, retriesInterval)
    .then(client => {
      console.log(`Connected successfully to db ${connectionUrl}`);
      const db = client.db(dbName);
      return Promise.resolve(db);
    })
    .catch(error => {
      return Promise.reject(`Unable to connect to db ${connectionUrl}: ${error.message}`);
    });

module.exports = {
  connectToMongoDb,
};
