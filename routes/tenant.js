var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Respond for Get Tenant Request....');
});

router.post('/', function (req, res) {
    console.log('Post tenant request :'+ JSON.stringify(req.body));
    let {firstName:firstName, lastName:lastName} = req.body;
    res.send({"firstName": firstName, "lastName":lastName, "tenantId":123});
  })

router.put('/:tenantId', function (req, res) {
    console.log('Post tenant request :'+ JSON.stringify(req.body));
    res.send('Got a PUT tenant request at /tenant')
  })  
router.delete('/:tenantId', function (req, res) {
    res.send('Got a Delete tenant request at /tenant')
  })  
module.exports = router;
