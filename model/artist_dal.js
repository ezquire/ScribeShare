var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.insert = function(params, callback) {

    // insert the address
    var query = 'INSERT INTO artist (artist_name, email, phone) VALUES (?)';

    var queryData = [params.artist_name, params.email, params.phone];

    connection.query(query, [queryData], function(err, result) {
        callback(err, result);
    });
};


exports.getAll = function(callback) {
    var query = 'SELECT * FROM artist';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(artist_id, callback) {
    var query = 'SELECT * FROM artist WHERE artist_id = ?';
    var queryData = [artist_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};


exports.update = function(params, callback) {
    var query = 'UPDATE artist SET artist_name = ?, email = ?, phone = ? WHERE artist_id = ?';
    var queryData = [params.artist_name, params.email, params.phone, params.artist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(artist_id, callback) {
    var query = 'DELETE FROM artist WHERE artist_id = ?';
    var queryData = [artist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};


exports.edit = function(artist_id, callback) {
    var query = 'SELECT * FROM artist WHERE artist_id = ?';
    var queryData = [artist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};