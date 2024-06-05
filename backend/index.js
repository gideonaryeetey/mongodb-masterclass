const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const _httpServer = http.createServer(app);
const dotenv = require('dotenv');
dotenv.config();

const corsOptions = {
  origin: '*',
};

const port = process.env.PORT || 3001;

const start = async () => {
  const routes = require('./routes');
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/', routes);

  _httpServer.listen(port);

  console.log(`Service Listening on ${port}`);
  app.emit('ready');

  return app;
};

start();