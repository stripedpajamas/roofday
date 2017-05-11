var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var roofday = (Math.floor(Math.random() * 100) >= 50) ? 'YES' : 'NO';
  res.render('index', { title: roofday });
});

module.exports = router;
