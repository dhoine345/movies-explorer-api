const router = require('express').Router();
const { updateProfile, getCurrentUser } = require('../controllers/users');
const { validateUpdateProfile } = require('../utils/validations');

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateProfile, updateProfile);

module.exports = router;
