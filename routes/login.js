var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  //host     : 'quizapp.ccwtwgtut47e.us-east-1.rds.amazonaws.com',
  //port : '3306',
  user     : 'root',
  password : '12312312', 
  database :'ecommerce',
}); 

/*Homescreen - login - post method*/
router.post('/', function(req, res, next) {
    var userName = req.query.username;
    var password = req.query.password;
    validate_login_credentials(userName,password,req,res);
});

function validate_login_credentials(userName,password,req,res) {
  req.session.endUser = userName;
  connection.query('SELECT * FROM user_credentials where username = ? AND password = ?',[userName,password],function(err,rows) {            
    if(err) {
      console.log("Error Selecting : %s ",err );
    }
    if(rows.length > 0) {
        console.log("user");
        res.json({"err_message":"You are logged in","menu":"menu item 1, menu item 2","Session ID":""+req.sessionID});
    }
    else {
      console.log("auth fail!!!");
      res.json({"err_message":"That username and password combination was not correct","menu":"menu item 1, menu item 2","Session ID":""+req.sessionID});
    }
  });
}


module.exports = router;