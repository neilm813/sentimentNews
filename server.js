const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var routes = require('./config/routes');

const sentiment = require('./sentiment.js');
//const routers = require('./config/routes');

var PORT = process.env.PORT || 3000;
require('dotenv').load();

const app = express();

app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sentiment.getSentiment();

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
  
});

module.exports = app;
