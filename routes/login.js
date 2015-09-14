var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  //host     : 'localhost',
  host     : 'quizapp.ccwtwgtut47e.us-east-1.rds.amazonaws.com',
  port : '3306',
  user     : 'root',
  password : '12312312', 
  database :'ecommerce',
}); 

/*Homescreen - login - post method*/
router.post('/', function(req, res, next) {
  var user_name = req.query.username;
  var password = req.query.password;
  validate_login_credentials(user_name,password,req,res);
});

function validate_login_credentials(user_name,password,req,res) {
  req.session.end_user = user_name;
  var login_result = false;
  //connection.connect();
  connection.query('SELECT * FROM user_credentials where username = ? AND password = ?',[user_name,password],function(err,rows) {            
    if(err) {
      console.log("Error Selecting : %s ",err );
    }
    if(rows.length > 0) {
      if(String(rows[0].role)=="administrator") {
        console.log("admin");
        req.session.role = "administrator";
        //res.send({code:'console'});
        res.json({"err_message":"You are logged in","menu":"menu item 1, menu item 2","Session ID":""+req.sessionID});
      }      
      else {
        console.log("user");
        req.session.role = "user";
        res.json({"err_message":"You are logged in","menu":"menu item 1, menu item 2","Session ID":""+req.sessionID});
        //res.send({code:'mcq'});
      }
    }
    else {
      console.log("auth fail!!!");
      res.json({"err_message":"That username and password combination was not correct","menu":"menu item 1, menu item 2","Session ID":""+req.sessionID});
      //res.send({code:'same'});
    }
  });
  //connection.end();
}


module.exports = router;