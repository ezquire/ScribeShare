var express = require('express');
var router = express.Router();
var company_dal = require('../model/company_dal');
var address_dal = require('../model/address_dal');
var account_dal = require('../model/account_dal');
var resume_dal = require('../model/resume_dal');

// View All resumes
router.get('/all', function(req, res) {
    resume_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeViewAll', { 'result':result });
        }
    });
});


// Return the select user form
router.get('/add/selectuser', function(req, res){
    account_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/userSelect', {'account': result});
        }
    });
});


router.get('/add', function(req, res){
    resume_dal.getUser(req.query.account_id, function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeAdd', {school: result[0], company: result[1], skill: result[2]});
        }
    });
});



// Insert a new address
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.street == "") {
        res.send('Please provide a street.');
    }
    else if(req.query.zip_code == "") {
        res.send('Please provide a zip code.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        address_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/address/all');
            }
        });
    }
});


router.get('/update', function(req, res) {
    address_dal.update(req.query, function(err, result){
       res.redirect(302, '/address/all');
    });
});




module.exports = router;
