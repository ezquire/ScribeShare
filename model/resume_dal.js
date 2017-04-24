var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.getAll = function(callback) {
    var query = 'SELECT a.first_name, a.last_name, r.resume_name FROM account a JOIN resume r on r.account_id = a.account_id ' +
                'ORDER BY a.first_name';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getUser = function(account_id, callback) {
    var query = 'CALL user_getinfo(?)';
    var queryData = [account_id]
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.insert = function(params, callback) {

    // FIRST INSERT THE COMPANY
    var query = 'INSERT INTO resume (resume_name) VALUES (?)';
    var queryData = [params.resume_name];

    connection.query(query, queryData, function(err, result) {

        // THEN USE THE COMPANY_ID RETURNED AS insertId AND THE SELECTED ADDRESS_IDs INTO COMPANY_ADDRESS
        var resume_id = result.insertId;

        // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
        var query = 'INSERT INTO resume_school (company_id, address_id) VALUES ?';

        // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES

    });

};

exports.delete = function(company_id, callback) {
    var query = 'DELETE FROM company WHERE company_id = ?';
    var queryData = [company_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

//declare the function so it can be used locally
var companyAddressInsert = function(company_id, addressIdArray, callback){
    // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    var query = 'INSERT INTO company_address (company_id, address_id) VALUES ?';

    // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
    var companyAddressData = [];
    for(var i=0; i < addressIdArray.length; i++) {
        companyAddressData.push([company_id, addressIdArray[i]]);
    }
    connection.query(query, [companyAddressData], function(err, result){
        callback(err, result);
    });
};
//export the same function so it can be used by external callers
module.exports.companyAddressInsert = companyAddressInsert;

//declare the function so it can be used locally
var companyAddressDeleteAll = function(company_id, callback){
    var query = 'DELETE FROM company_address WHERE company_id = ?';
    var queryData = [company_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//export the same function so it can be used by external callers
module.exports.companyAddressDeleteAll = companyAddressDeleteAll;

exports.update = function(params, callback) {
    var query = 'UPDATE company SET company_name = ? WHERE company_id = ?';
    var queryData = [params.company_name, params.company_id];

    connection.query(query, queryData, function(err, result) {
        //delete company_address entries for this company
        companyAddressDeleteAll(params.company_id, function(err, result){

            if(params.address_id != null) {
                //insert company_address ids
                companyAddressInsert(params.company_id, params.address_id, function(err, result){
                    callback(err, result);
                });}
            else {
                callback(err, result);
            }
        });

    });
};

/*  Stored procedure used in this example
     DROP PROCEDURE IF EXISTS company_getinfo;

     DELIMITER //
     CREATE PROCEDURE company_getinfo (company_id int)
     BEGIN

     SELECT * FROM company WHERE company_id = _company_id;

     SELECT a.*, s.company_id FROM address a
     LEFT JOIN company_address s on s.address_id = a.address_id AND company_id = _company_id;

     END //
     DELIMITER ;

     # Call the Stored Procedure
     CALL company_getinfo (4);

 */

exports.edit = function(company_id, callback) {
    var query = 'CALL company_getinfo(?)';
    var queryData = [company_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};