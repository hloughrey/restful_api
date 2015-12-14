// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// MongoDB
mongoose.connect('mongodb://localhost/website');

// Express
var app = express();
app.use(bodyParser.urlencoded({ extented: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/1', require('./routes/api/mongo'));
app.use('/api/2', require('./routes/api/pgres'));

//Start Server
app.listen(3000);
console.log('API is running on port 3000');
