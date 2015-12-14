// Dependencies
var express = require('express');
var router = express.Router();

//Cors
router.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    next();
});

// Models
var Product = require('../../models/products');
var Streets = require('../../models/streets');

// Routes
Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/products');
Streets.methods(['get', 'put', 'post', 'delete']);
Streets.register(router, '/streets');

// Return Router
module.exports = router;
