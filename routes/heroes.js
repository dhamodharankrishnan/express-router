var express = require('express');
var router = express.Router();
const heroDBService = require('../database/HeroDBService');


/* GET heroes listing. */
router.get('/', function(req, res, next) {
    console.log('Before calling Get Heroes request :'+ JSON.stringify(req.body));
    
    const heroes = [
        { id: 11, name: 'Dr APJ-Router' },
        { id: 12, name: 'Narco-Router' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
      ];
      res.send( heroes );
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
  })

  module.exports = router;  