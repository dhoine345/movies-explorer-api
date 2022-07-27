const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
//const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');
const { messages } = require('../utils/constants');
const { validateLogin, validateRegistration } = require('../utils/validations');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegistration, createUser);

//router.use(auth);

router.use('/users', require('./users'));
//router.use('/cards', require('./cards'));

router.use(() => {
  throw new NotFoundError(messages.pageNotFound);
});

module.exports = router;
