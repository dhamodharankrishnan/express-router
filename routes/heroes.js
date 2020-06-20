var express = require('express');
var router = express.Router();
const heroDBService = require('../database/HeroDBService');


/* GET heroes listing. */
router.get('/', function(req, res, next) {
    console.log('Before calling Get Heroes request :'+ JSON.stringify(req.body));
    heroDBService.getHeroes(res);
      console.log('After calling Get Heroes:');
      
  });

/**
 * Create Heroes
 */
router.post('/', function (req, res) {
    console.log('Post Hero request :'+ JSON.stringify(req.body));
    let heroObject = req.body;
    console.log('Hero Router - Before Calling Hero DB Service - save Hero');
    heroDBService.saveHero(heroObject);
    console.log('Hero Router - After Calling Hero DB Service - save Hero');
    
    let {id:id, name:name} = req.body;
    res.send({"id":id, "name": name});
  });

  router.delete('/:name', function (req, res) {
    let name = req.param('name');
    console.log('Delete Hero :'+name);
    let deleteHeroRequest = {name: name};
    heroDBService.deleteHero(deleteHeroRequest, res);
    
  })  

  router.put('/:name', function (apiRequest, apiResponse) {
    console.log('Put Hero request :'+ JSON.stringify(apiRequest.body));
    let name = apiRequest.param('name');
    let updateHeroRequest = {name: name};
    heroDBService.updateHero(updateHeroRequest, apiRequest, apiResponse);
  })  

  module.exports = router;  