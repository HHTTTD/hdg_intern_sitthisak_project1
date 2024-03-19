var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express_Test_API#สิทธิศักดิ์' });
});

module.exports = router;
