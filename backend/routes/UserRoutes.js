const router = require('express').Router();
const UserController = require('../controllers/UserController');

//users/register
router.post('/register', UserController.register);


module.exports = router;