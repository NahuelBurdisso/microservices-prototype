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

const createCollection = (db, collectionName) => {
  db.admin();
  db.createCollection(collectionName, function (err, result) {
    if (err) throw err;
    console.log(`Collection ${collectionName} created successfully`);
    return result;
    
  });
};

const insertDocumentInCollection = (db, collectionName, document ) => {
  db.admin();
  db.collection(collectionName).insertOne(document, function (err, result) {
    if (err) throw err;
    console.log(`Document inserted successfully in ${collectionName}`);
    return result;
  });
}

const insertManyDocumentsInCollection = (db, collectionName, documents ) => {
  db.admin();
  db.collection(collectionName).insertMany(documents, function (err, result) {
    if (err) throw err;
    console.log(`${result.insertedCount} documents inserted successfully in ${collectionName}`);
    return result;
  });
}

module.exports = {
  connectToMongoDb,
  createCollection,
  insertDocumentInCollection,
  insertManyDocumentsInCollection,
};
