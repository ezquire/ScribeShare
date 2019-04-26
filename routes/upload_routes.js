var express = require('express');
var router = express.Router();

// get Upload page
router.get('/', function(req, res) {
    res.render('upload/upload');
});

module.exports = router;
