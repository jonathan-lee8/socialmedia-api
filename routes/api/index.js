const router = require('express').Router();
const thoughtRoute = require('./thoughts');
const userRoute = require('./user');

router.use('/thoughts', thoughtRoute);
router.use('/users', userRoute);

module.exports = router;