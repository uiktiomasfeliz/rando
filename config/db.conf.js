const mongoose = require('mongoose');
const bluebird = require('bluebird');
const { dummyData } = require('../dummyData');
const serverConfig  = require('../config/config');

module.exports = class DBConfig {
  static init() {

    // Set native promises as mongoose promise
    mongoose.Promise = bluebird;
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);

    // MongoDB Connection
    if (process.env.NODE_ENV !== 'test') {
      mongoose.connect(serverConfig.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
        if (error) {
          console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
          throw error;
        }

        // feed some dummy data in DB.
        dummyData();
      });
    }
  }
};
