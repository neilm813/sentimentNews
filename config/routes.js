var express = require('express');
var router = express.Router();

var nytController = require('../controllers/nytController');

router.get('/nyt', nytController.getArchive);

module.exports = router;