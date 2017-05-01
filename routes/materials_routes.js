var express = require('express');
var router = express.Router();
var materials_dal = require('../model/materials_dal');

// View All materials
router.get('/all', function(req, res) {
    materials_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('materials/materialsViewAll', { 'result':result });
        }
    });

});

// View the company for the given id
router.get('/', function(req, res){
    if(req.query.materials_id == null) {
        res.send('materials_id is null');
    }
    else {
       materials_dal.getById(req.query.materials_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('materials/materialsViewById', {'result': result});
           }
        });
    }
});

// Return the add a a new materials form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    materials_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('materials/materialsAdd', {'materials': result});
        }
    });
});

// Insert a new materials
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.materials_name == "") {
        res.send('Please provide an materials name.');
    }
    else if(req.query.email == "") {
        res.send('Please provide an email.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        materials_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/materials/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.materials_id == null) {
        res.send('An materials id is required');
    }
    else {
        materials_dal.edit(req.query.materials_id, function(err, result){
            res.render('materials/materialsUpdate', {materials: result[0]});
        });
    }
});



router.get('/update', function(req, res) {
    materials_dal.update(req.query, function(err, result){
       res.redirect(302, '/materials/all');
    });
});

// Delete an materials for the given company_id
router.get('/delete', function(req, res){
    if(req.query.materials_id == null) {
        res.send('materials_id is null');
    }
    else {
         materials_dal.delete(req.query.materials_id, function(err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 //poor practice, but we will handle it differently once we start using Ajax
                 res.redirect(302, '/materials/all');
             }
         });
    }
});

module.exports = router;
