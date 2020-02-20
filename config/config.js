const config = {
  mongoURL: process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGO_URL || 'mongodb://localhost/rando',
  port: process.env.PORT || 5000,
};

module.exports = config;
