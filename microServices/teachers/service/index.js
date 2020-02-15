const { connectToMongoDb } = require('./utils/mongoDb');
const { connectionUrl, dbName } = require('./constants');

connectToMongoDb(connectionUrl, dbName)
  .then(db => {
    // do stuff here
  })
  .catch(error => {
    console.log(error);
  })