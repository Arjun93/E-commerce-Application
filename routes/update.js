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

router.post('/', function(req, res, next) {
  var userInputSessionId = req.query.sessionID;
  var userSessionId = req.sessionID;
  var isInputFormatCorrect = true;
  
  if(userInputSessionId === userSessionId) {
  	var currentUser = req.session.endUser;
	var firstName = req.query.fName;
	var lastName = req.query.lName;
	var userAddress = req.query.address;
	var userCity = req.query.city;
	var userState = req.query.state;
	var userZip = req.query.zip;
	var userEmail = req.query.email;
	var userName = req.query.uName;
	var passWord = req.query.pWord;
	var query = "UPDATE user_credentials SET";

	if(typeof firstName != 'undefined') {
		query += " firstname= '"+firstName+"',";
	}

	if(typeof lastName != 'undefined') {
		query += " lastname= '"+lastName+"',";
	}

	if(typeof userAddress != 'undefined') {
		query += " address= '"+userAddress+"',";
	}

	if(typeof userCity != 'undefined') {
		query += " city= '"+userCity+"',";
	}

	if(typeof userState != 'undefined') {
		if(userState.length != 2) {
			isInputFormatCorrect = false;
		}
		query += " state= '"+userState+"',";
	}

	if(typeof userZip != 'undefined') {
		if(userZip.length != 5) {
			isInputFormatCorrect = false;
		}
		query += " zip= '"+userZip+"',";
	}

	if(typeof userEmail != 'undefined') {
		query += " email= '"+userEmail+"',";
	}

	if(typeof userName != 'undefined') {
		query += " username= '"+userName+"',";
	}

	if(typeof passWord != 'undefined') {
		query += " password= '"+passWord+"',";
	}

	var finalQuery = query.substring(0,query.length-1);
	finalQuery = finalQuery+ " WHERE username='"+currentUser+"'";
	
	if (isInputFormatCorrect == true) {
		updateInformation(finalQuery,res);
	}
	else {
	    res.json({"message":"There was a problem with this action"});
	}
  }
  else {
  	res.json({"message":"There was a problem with this action"});
  }
});

function updateInformation(finalQuery,res) {
	var query = finalQuery;
	connection.query(query,function(err,rows) {            
	    if(err) {
	      console.log("Error Selecting : %s ",err );
	      res.json({"message":"There was a problem with this action"});
	    }
	    else {
	      res.json({"message":"Your information has been updated"});
	    }
	        
  	});
}

module.exports = router;