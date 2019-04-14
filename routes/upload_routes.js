var express = require('express');
var router = express.Router();
var artist_dal = require('../model/artist_dal');
var booking_dal = require('../model/booking_dal');

// View All artists
router.get('/all', function(req, res) {
   booking_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('upload/bookingViewAll', { 'result': result });
        }
    });

});

// View the browse for the given id
router.get('/', function(req, res){
    if(req.query.artist_id == null) {
        res.send('artist_id is null');
    }
    else {
       artist_dal.getById(req.query.artist_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('browse/artistViewById', {'result': result});
           }
        });
    }
});

// Return the add a new upload form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    booking_dal.getBookingInfo(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('upload/bookingAdd', {stage: result[0], employee: result[1]});
        }
    });
});

// Insert a new upload
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.artist_name == "") {
        res.send('Please provide an browse name.');
    }
    else if(req.query.email == "") {
        res.send('Please provide an email.');
    }
    else if(req.query.cost == "") {
        res.send('Please provide a price for the upload.');
    }
    else if(req.query.phone == "") {
        res.send('Please provide a contact number for the browse.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        booking_dal.saveArtist(req.query, function(err,result) {
            var artist_id = result.insertId;
            booking_dal.saveBooking(artist_id, req.query.stage_id, req.query.employee_id, req.query.cost, function(err,result) {
                booking_dal.getAll(function(err, result){
                    if(err) {
                        res.send(err);
                    }
                    else {
                        res.render('upload/bookingViewAll', { 'result': result, was_successful:true});
                    }
                });
            });
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.artist_id == null) {
        res.send('An browse id is required');
    }
    else {
        artist_dal.edit(req.query.artist_id, function(err, result){
            res.render('browse/artistUpdate', {artist: result[0]});
        });
    }
});



router.get('/update', function(req, res) {
    artist_dal.update(req.query, function(err, result){
       res.redirect(302, '/browse/all');
    });
});

// Delete an browse for the given company_id
router.get('/delete', function(req, res){
    if(req.query.artist_id == null) {
        res.send('artist_id is null');
    }
    else {
         artist_dal.delete(req.query.artist_id, function(err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 //poor practice, but we will handle it differently once we start using Ajax
                 res.redirect(302, '/browse/all');
             }
         });
    }
});

module.exports = router;
