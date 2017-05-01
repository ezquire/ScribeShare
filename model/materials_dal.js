var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.getAll = function(callback) {
    var query = 'SELECT * FROM materials';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(stage_id, callback) {
    var query = 'SELECT * FROM stage WHERE stage_id = ?';
    var queryData = [stage_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE stage SET stage_name = ?, email = ? WHERE stage_id = ?';
    var queryData = [params.stage_name, params.email, params.stage_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(stage_id, callback) {
    var query = 'DELETE FROM stage WHERE stage_id = ?';
    var queryData = [stage_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.insert = function(params, callback) {

    // insert the address
    var query = 'INSERT INTO stage (stage_name, email) VALUES (?)';

    var queryData = [params.stage_name, params.email];

    connection.query(query, [queryData], function(err, result) {
        callback(err, result);
    });
}; 

exports.edit = function(stage_id, callback) {
    var query = 'SELECT * FROM stage WHERE stage_id = ?';
    var queryData = [stage_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};