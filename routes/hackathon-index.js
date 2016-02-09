var express = require('express');
var router = express.Router();
var request = require('request');

var myVariable = "";
var uri = "https://europewest.services.azureml.net/workspaces/63194e97e2f8401b9ec065183ca28ef5/services/56fda0cfc9904f33957c65590cc69013/execute?api-version=2.0&details=true";
var api_key = "ZPEgo7h3QuBDC0jlk41tI2tCnWg6RVpmGOQ8jjZhkWoXKnC6o3rblXfxfxjq8k3HH1XRKoU9BHXGxQyFW86Qlw==";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about',function(req,res,next){
  res.render('about');
});

router.post('/submitForm',function(req,res,next){
  myName = req.body.Name;
  myAge = req.body.Age;
  myResidence = req.body.residence;
  myMeal = req.body.meal;
  myGender = req.body.genderSelect;
  mySymptom = req.body.symptomSelect;  
  
  var genderCode = 0;
  if(myGender==="Female"){
    genderCode = 1;
  }
  
  console.log(`${req.body}`);
  //body Temperature and sleep quality value

  request.post({
    uri: uri,
    method:'POST',
    headers: {Authorization:'Bearer ' + api_key},
    json: {
    "Inputs": {
   "input1": {
     "ColumnNames": [
       "UserId",
       "Gender",
       "Age",
       "Name_of_Meal",
       "Name_of_Allergen",
       "Feedback",
       "Symptoms"
     ],
     "Values": [
       [
         "0",
         genderCode,
         myAge,
         myMeal,
         "value",
         "0",
         mySymptom
       ],
       [
         "0",
         genderCode,
         myAge,
         myMeal,
         "value",
         "0",
         mySymptom
       ]
     ]
   }
 },
 "GlobalParameters": {}
}
  }).on('data',function(chunk){
        console.log(`Third Data from AZURE ${chunk}`);
        obj = JSON.parse(chunk);
        obj = obj.Results.output1.value.Values[0];
        obj = `${obj}`;
        obj = obj.split(',');
              console.log("initial object");
        console.log(obj);
        for (var i in obj){
          var num = parseFloat(i);
          i = num.toFixed(2);
        };

        var chances = obj.splice(7,12);
        
        for(var i=0;i<13;i++){
          chances[i] = parseFloat(chances[i]).toFixed(2) * 100;
        }
        
        var mainChance = parseFloat(obj[obj.length-2]).toFixed(2) * 100; 
    console.log("objects:");    
    console.log(obj);
        var items = ['Apple','Beef','Cow Milk','Dried Fruit','Egg','Fish','Gluten','Peanut','Sesame Seeds','Shellfish','Soy','Peanut','Wheat'];    
        console.log(obj);
        console.log(chances);
        res.render('results',{local:{
          Name:myName,
          Residence:myResidence,
          mainAllergen:obj[obj.length-1],
          one:items[0],
          onep:chances[0],
          two:items[1],
          twop:chances[1],
          three:items[2],
          threep:chances[2],
          four:items[3],
          fourp:chances[3],
          five:items[4],
          fivep:chances[4],
          six:items[5],
          sixp:chances[5],
          seven:items[6],
          sevenp:chances[6],
          eight:items[7],
          eightp:chances[7],
          nine:items[8],
          ninep:chances[8],
          ten:items[9],
          tenp:chances[9],
          eleven:items[10],
          elevenp:chances[10],
          twelve:items[11],
          twelvep:chances[11],
          thirteen:items[12],
          thirteenp:mainChance
        }});;
      });
    })





module.exports = router;
