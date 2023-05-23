const router = require('express').Router();
const usersController = require('../controller/users');

router.route('/signup')
  .post(usersController.userSignup);

router.route('/signin')
  .post(usersController.signIn);

router.route('/getuser/:uid')
.get(usersController.getUserById)


module.exports = router;

