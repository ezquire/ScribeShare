var express = require('express');
var router = express.Router();
var company_dal = require('../model/company_dal');
var address_dal = require('../model/address_dal');
var account_dal = require('../model/account_dal');
var skill_dal = require('../model/skill_dal');


// View All skills
router.get('/all', function(req, res) {
    skill_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('skill/skillViewAll', { 'result':result });
        }
    });
});

// View the skill for the given id
router.get('/', function(req, res){
    if(req.query.skill_id == null) {
        res.send('skill_id is null');
    }
    else {
        skill_dal.getById(req.query.skill_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('skill/skillViewById', {'result': result});
           }
        });
    }
});

// Return the add a new skill form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    skill_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('skill/skillAdd', {'skill': result});
        }
    });
});

// Insert a new skill
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.skill_name == "") {
        res.send('Please provide a name.');
    }
    else if(req.query.description == "") {
        res.send('Please provide a description.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        skill_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/skill/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.skill_id == null) {
        res.send('A skill id is required');
    }
    else {
        skill_dal.edit(req.query.skill_id, function(err, result){
            res.render('skill/skillUpdate', {skill: result[0]});
        });
    }

});


router.get('/update', function(req, res) {
    skill_dal.update(req.query, function(err, result){
       res.redirect(302, '/skill/all');
    });
});


// Delete an skill for the given skill_id
router.get('/delete', function(req, res){
    if(req.query.skill_id == null) {
        res.send('skill_id is null');
    }
    else {
         skill_dal.delete(req.query.skill_id, function(err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 //poor practice, but we will handle it differently once we start using Ajax
                 res.redirect(302, '/skill/all');
             }
         });
    }
});

module.exports = router;
