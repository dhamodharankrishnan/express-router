var express = require('express');
var router = express.Router();
const tenantDBService = require('../database/TenantDBService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('Before calling Get tenant request :'+ JSON.stringify(req.body));
  //res.send('Respond for Get Tenant Request....');
  tenantDBService.getTenant(res);
  console.log('After calling Get tenant:');
  
});

/**
 * Create Tenant
 */
router.post('/', function (req, res) {
    console.log('Post tenant request :'+ JSON.stringify(req.body));
    let tenantObject = req.body;
    console.log('Tenant Router - Before Calling Tenant DB Service - save Tenant');
    tenantDBService.saveTenant(tenantObject);
    console.log('Tenant Router - After Calling Tenant DB Service - save Tenant');
    
    let {firstName:firstName, lastName:lastName} = req.body;
    res.send({"firstName": firstName, "lastName":lastName, "tenantId":123});
  })

router.put('/:tenantId', function (req, res) {
    console.log('Post tenant request :'+ JSON.stringify(req.body));
    res.send('Got a PUT tenant request at /tenant')
  })  
router.delete('/:tenantId', function (req, res) {
    let tenantId = req.param('tenantId');
    console.log('Delete Tenant :'+tenantId);
    let deleteTenantRequest = {tenantId: tenantId};
    tenantDBService.deleteTenant(deleteTenantRequest, res);
    
  })  
module.exports = router;
