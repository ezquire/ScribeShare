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

exports.getStageCosts = function(value, callback) {
    var query = 'SELECT s.stage_id, IFNULL(SUM(b.cost), NULL) as cost FROM booking b ' +
        'LEFT JOIN stage s ON s.stage_id = b.stage_id GROUP BY s.stage_id HAVING SUM(b.cost) > ?';
    var queryData = [value];
    console.log(query);

    connection.query(query, [queryData], function(err, result) {
        callback(err, result);
    });
};

