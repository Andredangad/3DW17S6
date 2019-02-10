'use strict';

module.exports = function(app) {
  var userCtrl = require('../controllers/user-controller');

  app.route('/users')
    .get(userCtrl.findUserByEmail)
    .post(userCtrl.createUser);


  app.route('/users/:userid')
    .get(userCtrl.findUser)
    .put(userCtrl.updateUser)
    .delete(userCtrl.removeUser);
};
