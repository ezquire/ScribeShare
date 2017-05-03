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


// Return the add a a new stage form
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


module.exports = router;
