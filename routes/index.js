var express = require('express');
var router = express.Router();
var fs = require('fs');
var morgan = require('morgan');


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
  res.render('nodeJSprojects');
});

router.get('/movie',function(req,res){
  res.render('movie');
});

module.exports = router;
