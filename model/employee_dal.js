var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.insert = function(params, callback) {

    // insert the address
    var query = 'INSERT INTO employee (employee_name, email) VALUES (?)';

    var queryData = [params.employee_name, params.email];

    connection.query(query, [queryData], function(err, result) {
        callback(err, result);
    });
};


exports.getAll = function(callback) {
    var query = 'SELECT * FROM employee';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(employee_id, callback) {
    var query = 'SELECT * FROM employee WHERE employee_id = ?';
    var queryData = [employee_id];
    console.log(query);
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE employee SET fname = ?, lname = ?, phone = ?, WHERE employee_id = ?';
    var queryData = [params.fname, params.lname, params.phone, params.stage_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(employee_id, callback) {
    var query = 'DELETE FROM employee WHERE employee_id = ?';
    var queryData = [employee_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};


exports.edit = function(employee_id, callback) {
    var query = 'SELECT * FROM employee WHERE employee_id = ?';
    var queryData = [employee_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};