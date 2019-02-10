'use strict';

module.exports = function(app) {
  var userReviewCtrl = require('../controllers/user-review-controller');

  app.route('/users/:userid/games/:gameid/review')
    .get(userReviewCtrl.findUserReview)
    .post(userReviewCtrl.createUserReview)
	.put(userReviewCtrl.updateUserReview)
    .get(userReviewCtrl.findAllUserReview)
    .delete(userReviewCtrl.removeUserReview);

  app.route('/users/:userid/reviews')
    .get(userReviewCtrl.findAllUserReview)

};
