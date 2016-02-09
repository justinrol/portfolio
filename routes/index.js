var express = require('express');
var router = express.Router();
var fs = require('fs');
var morgan = require('morgan');
var tawesomeForm = require('../public/json/tawesomeJSON.json')
var request = require('request');
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

router.get('/projects/:name',function(req,res){
  var name = req.params.name;
  console.log(`name: ${name}`);
  res.render('projects/' + name, {title:name});
})

router.get('/projects/hackathons/:name',function(req,res){
  var name = req.params.name;
  res.render('projects/hackathons/' + name,{title:name});
});

router.get('/contact',function(req,res){
  res.render('contact', {title: 'Contacts'});
});

router.get('/movie',function(req,res){
  res.render('movie',{title: 'Clips'});
});

router.post('/projects/hacakthons/tawesome/submitForm',function(req,res){
  
  var uri= "https://europewest.services.azureml.net/workspaces/63194e97e2f8401b9ec065183ca28ef5/services/56fda0cfc9904f33957c65590cc69013/execute?api-version=2.0&details=true";
  
  var api_key = "ZPEgo7h3QuBDC0jlk41tI2tCnWg6RVpmGOQ8jjZhkWoXKnC6o3rblXfxfxjq8k3HH1XRKoU9BHXGxQyFW86Qlw==";
  
  var myName      = req.body.Name;
  var myAge       = req.body.Age;
  var myResidence = req.body.residence;
  var myMeal      = req.body.meal;
  var myGender    = req.body.genderSelect;
  var Symptom     = req.body.symptomSelect;
  
  var genderCode = 0;
  
  if(myGender === "Female"){
    genderCode = 1;
  }
  for(var i = 0; i< 2; i++){
    tawesomeForm.Inputs.input1.Values[i][1] = genderCode;
    tawesomeForm.Inputs.input1.Values[i][2] = myAge;
    tawesomeForm.Inputs.input1.Values[i][3] = myMeal;
    tawesomeForm.Inputs.input1.Values[i][6] = Symptom;
  }
  fs.writeFileSync("./public/json/newTawesomeForm.json",JSON.stringify(tawesomeForm));

  var newForm = require('../public/json/newTawesomeForm.json');

  request.post({
    uri: uri,
    method: 'POST',
    headers: {  Authorization: 'Bearer ' + api_key  },
    json: newForm
  
  }).on('data',function(data){
    obj = JSON.parse(data);
    obj = (`${obj.Results.output1.value.Values[0]}`).split(',');
    
    var warn_food = obj[20];
    obj = obj.splice(7,13);
    
    var food=['Apple','Beef','Milk','DriedFruit','Egg','Fish','Gluten','Peanut','SesameSeeds','Shellfish','Soy','Peanut','Wheat'];
    var info = new Array(13);
    
    
    for(var i=0;i<13;i++){
      obj[i] = (parseFloat(obj[i]) * 100).toFixed(2);
      info[i] = new Array(2);
      info[i][0] = obj[i];
      info[i][1] = food[i];
    }
    console.log(warn_food);
    JSON.stringify(info);
    
    console.log(info);
    console.log(food.length);
    res.render('projects/hackathons/tawesomeResults.jade',{
      userName: myName,
      information: info,
      warn: warn_food
    })

  }).on('error',function(err){
        
        })

});


module.exports = router;
