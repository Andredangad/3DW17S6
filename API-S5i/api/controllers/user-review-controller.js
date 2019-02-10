'use strict';

const mongoose = require('mongoose');
const UserReview = require('../models/review-schema');

exports.createUserReview = function(req, res) {
  var newUserReview = new UserReview(req.body);
  newUserReview.gameid = req.params.gameid;
  newUserReview.userid = req.params.userid;
  newUserReview.save(function(err, userreview) {
    if (err)
    {
      console.error(err);
      res.json({
        message: err.code === 11000 ? 'Review already exist' : 'Unable to create review'
      });
    }
    res.json(userreview);
  });
};

exports.findAllUserReview = function(req, res) {
  UserReview.find(function(err, userreview) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to find review '+req.params.userid });
    }
    res.json(userreview);
  });
};

exports.findUserReview = function(req, res) {
  UserReview.find({  
  gameid : req.params.gameid, 
  userid : req.params.userid
  }, function(err, userreview) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to find review '+eq.params.userid });
    }
    res.json(userreview);
  });
};

exports.updateUserReview = function(req, res) {
  UserReview.findOneAndUpdate(req.params.userid, req.body, {new: true}, function(err, userreview) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to update review' });
    }
    res.json(userreview);
  });
};


exports.removeUserReview = function(req, res) {
  UserReview.remove({
  gameid : req.params.gameid, 
  userid : req.params.userid
  }, function(err, UserReview) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to delete review' });
    }
    res.json({ message: 'Review successfully deleted' });
  });
};
