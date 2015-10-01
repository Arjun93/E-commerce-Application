var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  //host     : 'quizapp.ccwtwgtut47e.us-east-1.rds.amazonaws.com',
  port : '3306',
  user     : 'root',
  password : '12312312', 
  database :'ecommerce',
}); 


/*Handling logout*/
router.post('/', function(req, res, next) {
  var userInputSessionId = req.body.sessionID;
  var userSessionId = req.sessionID;
  var userName = req.session.endUser;
  var userDbSessionId;
  console.log(userSessionId);
  connection.query('SELECT * FROM user_credentials WHERE sessionId = ?',[userSessionId],function(err,rows) {            
      if(err) {
        console.log("Error Selecting : %s ",err );
        res.json({"message":"You are not currently logged in"});
      }
      if(rows.length > 0) {
        req.session.destroy();
        res.json({"success":"You have been logged out"});
      }
      else {
        res.json({"message":"You are not currently logged in"});
      } 
    });
  });

module.exports = router;
