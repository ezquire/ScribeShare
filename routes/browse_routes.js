var express = require('express');
var router = express.Router();

// View All browse
router.get('/', function(req, res) {
    res.render('browse/browseAll');
});

// View individual notes (really this should be one page that gets rendered with a back-end)
router.get('/activation', function(req, res) {
    res.render('notes/activation');
});

router.get('/compilers', function(req, res) {
    res.render('notes/compilers');
});

router.get('/hashing', function(req, res) {
    res.render('notes/hashing');
});

router.get('/sysequation', function(req, res) {
    res.render('notes/sysequation');
});

router.get('/migration', function(req, res) {
    res.render('notes/migration');
});

router.get('/photosynthesis', function(req, res) {
    res.render('notes/photosynthesis');
});

router.get('/emacs', function(req, res) {
    res.render('notes/emacs');
});

router.get('/tectonics', function(req, res) {
    res.render('notes/tectonics');
});

router.get('/numerals', function(req, res) {
    res.render('notes/numerals');
});

// Thank you for submitting page
router.get('/submit', function(req, res) {
    res.render('notes/submit');
});

module.exports = router;
