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


module.exports = router;
