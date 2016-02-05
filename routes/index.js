var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome!' });
});

router.get('/about',function(req,res){
  res.render('about');
});

router.get('/projects',function(req,res){
  res.render('projects');
});

router.get('/contact',function(req,res){
  res.render('contact');
});

router.get('/nodeJSprojects',function(req,res){
  res.render('nodeJSprojects')
});

module.exports = router;
