var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.getAll = function(callback) {
    var query = 'SELECT * FROM stage';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getStageCosts = function(value1, value2, callback) {
    var query = 'SELECT s.stage_id, IFNULL(SUM(b.cost), NULL) as cost FROM booking b ' +
        'LEFT JOIN stage s ON s.stage_id = b.stage_id GROUP BY s.stage_id HAVING SUM(b.cost) > ? AND SUM(b.cost) < ?';
    var queryData = [value1, value2];
    console.log(query);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    // insert the stage
    var query = 'INSERT INTO stage (open_time, close_time) VALUES (?)';
    var queryData = [params.open_time, params.close_time];
    connection.query(query, [queryData], function(err, result) {
        callback(err, result);
    });
};

exports.insertMaterials = function(material_id, material_type, quantity, stage_id, callback) {
    // insert the address
    var query = 'INSERT INTO materials (material_id, material_type, quantity, stage_id) VALUES (?)';
    var queryData = [material_id, material_type, quantity, stage_id];
    connection.query(query, [queryData], function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(employee_id, callback) {
    var query = 'DELETE FROM stage WHERE stage_id = ?';
    var queryData = [employee_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};