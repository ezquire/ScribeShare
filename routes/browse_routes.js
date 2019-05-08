var express = require('express');
var router = express.Router();

// View All browse
router.get('/', function(req, res) {
    res.render('browse/browseAll');
});

// View individual notes (really this should be one page that gets rendered with a back-end)
router.get('/systems', function(req, res) {
    res.render('notes/systems');
});

router.get('/activation', function(req, res) {
    res.render('notes/activation');
});

router.get('/compilers', function(req, res) {
    res.render('notes/compilers');
});

router.get('/hashing', function(req, res) {
    res.render('notes/hashing');
});

router.get('/migration', function(req, res) {
    res.render('notes/migration');
});

router.get('/photo', function(req, res) {
    res.render('notes/photo');
});

// Thank you for submitting page
router.get('/submit', function(req, res) {
    res.render('notes/submit');
});

module.exports = router;
