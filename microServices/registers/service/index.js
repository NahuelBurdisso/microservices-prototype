const { connectToMongoDb, createCollection, insertManyDocumentsInCollection } = require('./utils/mongoDb');
const { connectionUrl, dbName } = require('./constants');

// Documents
const { registers } = require('./utils/dbDocuments');

connectToMongoDb(connectionUrl, dbName)
  .then(db => {
    createCollection(db, 'registers');
    insertManyDocumentsInCollection(db, 'registers', registers);
    db.close();
  })
  .catch(error => {
    console.log(error);
  });