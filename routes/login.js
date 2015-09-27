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
    var userName = req.body.username;
    var password = req.body.password;
    console.log(userName);
    console.log(password);
    if(typeof userName == 'undefined' || typeof password == 'undefined' || userName == "" || password == "") {
      res.json({"err_message":"Not sufficient information"});
      req.session.endUser="";
    }
    else {
      validate_login_credentials(userName,password,req,res);
    }
});

function validate_login_credentials(userName,password,req,res) {
  if(req.session.endUser) {
    if(req.session.endUser == userName) {
      res.json({"err_message":"You are already logged in"});
    }
    else {
      res.json({"err_message":"Another user already logged in"});
    }
  }
  else {
    req.session.endUser = userName;
    connection.query('SELECT * FROM user_credentials where username = ? AND password = ?',[userName,password],function(err,rows) {            
      if(err) {
        console.log("Error Selecting : %s ",err );
      }
      if(rows.length > 0) {
          req.session.cookie.maxAge = new Date(Date.now() + 15000);
          req.session.role = rows[0].role;
          var personRole = req.session.role;
          if(personRole == 'admin') {
            res.json({"message":"You are logged in","menu":"Login, Logout, Update contact information, Modify products, View Users, View products","Session ID":""+req.sessionID});
          }
          else {
            res.json({"message":"You are logged in","menu":"Login, Logout, Update contact information, View products","Session ID":""+req.sessionID});
          }  
      }
      else {
        console.log("auth fail!!!");
        req.session.endUser = "";
        res.json({"err_message":"That username and password combination was not correct"});
      }
    });
  }
}


module.exports = router;