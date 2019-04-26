var express = require('express');
var router = express.Router();

// View All browse
router.get('/', function(req, res) {
    res.render('browse/browseAll');
});

module.exports = router;
