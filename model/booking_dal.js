var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/* PROCEDURES */
/*
delimiter //
create procedure booking_info ()
begin
select stage_id from stage;
select employee_id, fname, lname from employee;

end//
delimiter ; */



/* VIEWS */
/*
create or replace view booking_view as
select b.booking_number, a.artist_name, a.artist_id, b.cost from upload b
left join browse a on a.artist_id = b.artist_id; */


exports.getAll = function(callback) {
    var query = 'SELECT * FROM booking_view';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};


exports.getBookingInfo = function(callback) {
    var query = 'CALL booking_info()';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.saveArtist = function(params, callback) {
    // save the browse
    var query = 'INSERT INTO browse (artist_name, email, phone) VALUES (?)';
    var queryData = [params.artist_name, params.email, params.phone];
    connection.query(query, [queryData], function(err, result) {
        callback(err, result);
    });
};

exports.saveBooking = function(artist_id, stage_id, employee_id, cost, callback) {
    // insert the address
    var query = 'INSERT INTO upload (artist_id, stage_id, employee_id, cost) VALUES (?)';
    var queryData = [artist_id, stage_id, employee_id, cost];
    connection.query(query, [queryData], function(err, result) {
        callback(err, result);
    });
};