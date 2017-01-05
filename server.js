const express = require('express');
const path = require('path');

//var routers = require('./config/routes');
const sentiment = require('./sentiment.js');
const app = express();
require('dotenv').load();

//app.use('/', routes);

//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

// app.listen(PORT, function() {
//   console.log('Listening on PORT 3000');
// })

sentiment.getSentiment();


module.exports = app;
