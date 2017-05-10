var express = require('express');
var router = express.Router();
var stage_dal = require('../model/stage_dal');

// View All stages
router.get('/all', function(req, res) {
    stage_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('stage/stageViewAll', { 'result':result });
        }
    });

});


// Return the stage cost form
router.get('/budget', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    stage_dal.getStageCosts(req.query.value, function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('stage/stagesCost', {'result': result});
        }
    });
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    stage_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('stage/stageAdd', {stage: result});
        }
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.open_time == "") {
        res.send('Please provide an opening time.');
    }
    else if(req.query.close_time == "") {
        res.send('Please provide an closing time.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        stage_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                var stage_id = result.insertId
               stage_dal.insertMaterials(req.query.material_id, req.query.material_type, req.query.quantity, stage_id, function(err, result) {
                   if(req.query.material_id2 == "" && req.query.material_type2 == "" && req.query.quantity2 == "") {
                       res.redirect(302, '/stage/all');
                   }
                   else {
                       stage_dal.insertMaterials(req.query.material_id2, req.query.material_type2, req.query.quantity2, stage_id, function (err, result) {
                           res.redirect(302, '/stage/all');
                       });
                   }
                });
            }
        });
    }
});

// Delete an employee for the given company_id
router.get('/delete', function(req, res){
    if(req.query.stage_id == null) {
        res.send('stage_id is null');
    }
    else {
        stage_dal.delete(req.query.stage_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/stage/all');
            }
        });
    }
});

module.exports = router;
