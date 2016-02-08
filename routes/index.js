var express = require('express');
var router = express.Router();
var fs = require('fs');
var morgan = require('morgan');


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome!' });
});

router.get('/about',function(req,res){
  res.render('about', {title: 'About'});
});

router.get('/projects',function(req,res){
  res.render('projects',{title: 'Projects'});
});

router.get('/contact',function(req,res){
  res.render('contact', {title: 'Contacts'});
});

router.get('/projects/nodeJS',function(req,res){
  res.render('nodeJSprojects', {title:'nodeJS Projects'});
});

router.get('/movie',function(req,res){
  res.render('movie',{title: 'Clips'});
});

module.exports = router;
