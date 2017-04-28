var express = require('express');
var router = express.Router();
var employee_dal = require('../model/employee_dal');

// View All employee
router.get('/all', function(req, res) {
    employee_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('employee/employeeViewAll', { 'result':result });
        }
    });

});

// View the employee for the given id
router.get('/', function(req, res){
    if(req.query.employee_id == null) {
        res.send('employee_id is null');
    }
    else {
       employee_dal.getById(req.query.employee_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('employee/employeeViewById', {'result': result});
           }
        });
    }
});

// Return the add a a new employee form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    employee_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('employee/employeeAdd', {'employee': result});
        }
    });
});

// Insert a new employee
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.employee_name == "") {
        res.send('Please provide an employee name.');
    }
    else if(req.query.email == "") {
        res.send('Please provide an email.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        employee_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/employee/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.employee_id == null) {
        res.send('An employee id is required');
    }
    else {
        employee_dal.edit(req.query.employee_id, function(err, result){
            res.render('employee/employeeUpdate', {employee: result[0]});
        });
    }
});



router.get('/update', function(req, res) {
    employee_dal.update(req.query, function(err, result){
       res.redirect(302, '/employee/all');
    });
});

// Delete an employee for the given company_id
router.get('/delete', function(req, res){
    if(req.query.employee_id == null) {
        res.send('employee_id is null');
    }
    else {
         employee_dal.delete(req.query.employee_id, function(err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 //poor practice, but we will handle it differently once we start using Ajax
                 res.redirect(302, '/employee/all');
             }
         });
    }
});

module.exports = router;
