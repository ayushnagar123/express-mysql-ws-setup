var express = require('express');
const { UserController } = require('../controllers');
var router = express.Router();

/* GET users listing. */
router.get('/', UserController.index);

router.get('/:uuid', UserController.getUserByUUID);

router.post('/', UserController.create);

router.delete('/:uuid', UserController.deleteUserByUUID);

module.exports = router;
