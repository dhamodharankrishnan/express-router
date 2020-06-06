var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://localhost:27017/";
const ERROR_001 = {code:'GET_HERO_ERROR', message:'Error gettting HERO data'};
const ERROR_002 = {code:'CREATE_HERO_ERROR', message:'Error creating HERO in database'};
const ERROR_004 = {code:'DELETE_HERO_ERROR', message: 'Error deleting HERO in database'};


/**
 * HERODB Service - saveHERO method to save the HERO object in Mongo DB.
 * @param {*} heroObject  - HERO Json from Express router.
 */
exports.saveHero = (heroObject) => {

    console.log('HERODBService - saveHERO');
    console.log(heroObject);
    MongoClient.connect(url, function(err, db) {
        if (err) {
            handleError(err, responseCallback, ERROR_002);
        }else{
            var dbo = db.db("herodb");
            
            //dbo.collection(<TABLE_NAME>).insertOne ( Object )
            dbo.collection("hero").insertOne(heroObject, function(err, res) {
                if (err) {
                    handleError(err, responseCallback, ERROR_002);
                }else{
                    console.log("1 document inserted");
                    //Close the db after insertion.
                    db.close();
                }
            });
        }
    });

}

exports.getHERO = (responseCallback) => {

    console.log('HERODBService - getHERO');
    MongoClient.connect(url, function(err, db) {
    if (err) {
        handleError(err, responseCallback, ERROR_001);
    }else{
        var dbo = db.db("HEROdb");
        
        //dbo.collection(<TABLE_NAME>).insertOne ( Object )
        dbo.collection("HERO").find({}).toArray(function(err, result) {
            if (err) {
                handleError(err, responseCallback, ERROR_001);
            }else {
                responseCallback.send(result);
            }
            db.close();
            });
    }
  });
}

exports.deleteHERO = ( deleteHERORequest, responseCallback) => {
    console.log('HERODBService - deleteHERO');
    MongoClient.connect(url, function(err, db) {
    if (err) {
        handleError(err, responseCallback, ERROR_004);
    }else{
        var dbo = db.db("HEROdb");
        
        var deleteQuery = {"_id": ObjectId(deleteHERORequest.HEROId) };
        dbo.collection("HERO").deleteOne(deleteQuery, function(err, result) {
            if (err) {
                handleError(err, responseCallback, ERROR_004);
            }else {
                responseCallback.status(204);
                responseCallback.send();
            }
            db.close();
            });
    }
  });
}

function handleError (exception, responseCallback, errorConstant) {
    let errorMessage = {
        "code" : errorConstant.code,
        "message" : errorConstant.message
    };
    responseCallback.status(500);
    responseCallback.send(errorMessage);
    console.log(exception);

}
