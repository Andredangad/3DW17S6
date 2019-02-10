'use strict';

const mongoose = require('mongoose');

var UserReviewSchema = new mongoose.Schema({
  userid: {
    type: String,
    

  },
  gameid: {
    type: String,

  },
  score: {
    type: Number,

  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

UserReviewSchema.pre('save', function(next) {
    if (!this.createdOn) {
        this.createdOn = new Date();
    }
    next();
});

UserReviewSchema.pre('validate', function(next) {
    if (this.isModified('createdOn')) {
        this.invalidate('createdOn');
    }
    next();
});

module.exports = mongoose.model('ReviewsUser', UserReviewSchema);
