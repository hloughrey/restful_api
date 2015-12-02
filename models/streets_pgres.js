// Dependencies
var express = require('express');
var router = express.Router();
// var pg = require('pg');
// var path = require('path');
// var conString = require(path.join(__dirname, '../', 'credentials'));

router.get('/api/streets', function(req, res) {
    res.send('api is working!');

    // var result = [];
    //
    // // Get a Postgres client from connection pool
    // pg.connect(conString, function(err, client, done){
    //     // Handle connection errors
    //     if(err){
    //         done();
    //         console.log(err);
    //         return res.status(500).json({success: false, data: err});
    //     }
    //
    //     // SQL Query > Select data
    //     var query = client.query("SELECT usrn, roadname, description, town, dft_no, adoption_status, street_type, open, notes, ST_AsGeoJSON(ST_Transform(geom, 4326)) AS geom FROM herefordshire.lsg lsg limit 10");
    //
    //     // Stream results back one row at a time
    //     query.on('row', function(row){
    //         results.push(row);
    //     });
    //
    //     // After all data is returned, close connection and return results
    //     query.on('end', function(){
    //         done();
    //         return res.json(results);
    //     });
    // });
});

module.exports = router;
