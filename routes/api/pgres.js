// Dependencies
var express = require('express'),
    router = express.Router(),
    pg = require('pg'),
    credentials = require("../../credentials"),
    url = require('url');


// Cors
router.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    next();
});

  // Get Query Results
  router.get('/streets', function(req, res){

    var creds = credentials.dev,
        conString = "postgres://" + creds.user + "@" + creds.host + ":" + creds.port + "/" + creds.database,
        geoJsonResults = [];

    pg.connect(conString, function (err, client, done) {
        var query,
            filter,
            bbox;

        filter = url.parse(req.url, true).query,
        bbox = filter.bbox;

        if (err) {
            return console.error('Error fetching client from pool', err);
        }

        query = client.query("SELECT usrn, roadname, description, town, dft_no, adoption_status, street_type, open, notes, ST_AsGeoJSON(ST_Transform(geom, 4326)) AS geom FROM herefordshire.lsg lsg LIMIT 10");
        // var query = client.query("SELECT usrn, roadname, description, town, dft_no, adoption_status, street_type, open, notes, ST_AsGeoJSON(ST_Transform(geom, 4326)) AS geom FROM herefordshire.lsg lsg WHERE geom && ST_Transform(ST_GeometryFromText($1, 4326), 27700) AND ST_Intersects(geom, ST_Transform(ST_GeometryFromText($1, 4326), 27700))", [bbox]);

        query.on('row', function (row, result) {
            var qResult = '{ "type": "Feature", "geometry":' + row.geom + ', "properties": { "usrn": "' + row.usrn + '", "roadname": "' + row.roadname + '", "description": "' + row.description + '", "town": "' + row.town + '", "adoption_status": "' + row.adoption_status + '", "street_type":"' + row.street_type + '", "open": "' + row.open + '", "notes": "' + row.notes + '"}}';
            geoJsonResults.push(qResult);
        });

      query.on('end', function(result){
          done();
          var geoJsonOutline = '{ "type": "FeatureCollection", "features":[';
          var crsObj = '], "crs":{"type":"EPSG","properties":{"code":"4326"}}}';
          var geoJsonString = geoJsonOutline + geoJsonResults + ']}';
          var geoJsonObj = JSON.parse(geoJsonString);
          res.json(geoJsonObj);
      });
  });
});

// Return Router
module.exports = router;
