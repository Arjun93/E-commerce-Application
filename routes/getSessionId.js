var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/*router.post('/', function(req, res, next) {
  var userDbSessionId = req.sessionID;
  if(userDbSessionId != "" && typeof userDbSessionId != 'undefined') {
    connection.query('SELECT * FROM user_credentials where sessionId = ?',[userDbSessionId],function(err,rows) {            
      if(err) {
        console.log("Error Selecting : %s ",err );
      }
      if(rows.length > 0) {
          
      }
      else {
        res.json({"err_message":"Invalid sessionId"});
      }
    });
  }
  else {
    res.json({"err_message":"Your are not logged in"});
  }
});
*/
module.exports = router;