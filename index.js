const express = require('express');
const path = require('path');

const app = express();

const serverConfig = require('./config/config');
const DBConfig = require('./config/db.conf');
const RoutesConfig = require('./config/routes.conf');

// Setup database
DBConfig.init();

// Setup routes
RoutesConfig.init(app);

app.all('/api/*', (req, res, next) => {
  console.log("entra por aqui!....")
  next();
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  // if (req.url === '/api') return next();
  // else
  console.log("entra por aqui!....")
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});
