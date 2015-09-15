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

router.get('/', function(req, res, next) {
  
  var userName = req.session.endUser;
  var firstnamePattern = req.query.fName;
  var lastnamePattern = req.query.lName;
  var query = "SELECT * FROM user_credentials";
  if(userName === "jadmin") {
  	if(firstnamePattern || lastnamePattern) {
  		query += " WHERE firstname LIKE '%"+firstnamePattern+"%' AND lastname LIKE '%"+lastnamePattern+"%'";
  		console.log(query);
  	}

  	connection.query(query,function(err,rows) {            
	    if(err) {
	      console.log("Error Selecting : %s ",err );
	    }
	    if(rows.length > 0) {
	    	res.json({"user_list":rows});
	    }
	    else {
	    	res.json({"err_message":"no results found"});
	    }
  	});
  }
  else {
  	res.json({"err_message":"you are not authorized to view the information."});
  }

});

module.exports = router;