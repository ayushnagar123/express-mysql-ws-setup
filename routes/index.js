var express = require('express');
var router = express.Router();
const UserRoutes = require('./user-routes');

/* GET home page. */
router.use('/users', UserRoutes);

module.exports = router;
