// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var streetsSchema = new mongoose.Schema({
    id: Number,
    usrn: Number,
    dft_no: String,
    roadname: String,
    town: String,
    adoptive_status: String,
    open: Boolean,
    notes: String,
    geometry: Array
});

// Return Model
module.exports = restful.model('Streets', streetsSchema);
