var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  //host     : 'localhost',
  host     : 'quizapp.ccwtwgtut47e.us-east-1.rds.amazonaws.com',
  //port : '3306',
  user     : 'root',
  password : '12312312',
  database :'ecommerce',
});

router.post('/', function(req, res, next) {
  var firstName = req.query.fName;
  var lastName = req.query.lName;
  var userAddress = req.query.address;
  var userCity = req.query.city;
  var userState = req.query.state;
  var userZip = req.query.zip;
  var userEmail = req.query.email;
  var userName = req.query.uName;
  var passWord = req.query.pWord;
 
  var validationResult = validateUserInformation(firstName,lastName,userAddress,userCity,userState,userZip,userEmail,userName,passWord);
  insertUserInformation(firstName,lastName,userAddress,userCity,userState,userZip,userEmail,userName,passWord,res,validationResult);
});

function validateUserInformation(firstName,lastName,userAddress,userCity,userState,userZip,userEmail,userName,passWord) {
	var validationFlag = 0;
	if (firstName == "" || lastName =="" || userAddress =="" || userCity =="" ||userState == "" || userZip == "" || userEmail == "" || userName == "" || passWord == "" ) {
		validationFlag = 1;
		console.log("Validation Error");
	}
	if (userState.length != 2 || userZip.length != 5) {
		validationFlag = 1;
		console.log("Validation Error");
	}
	if (validationFlag == 1) {
		return false;
	}
	else {
		return true;
	}

}


function insertUserInformation(firstName,lastName,userAddress,userCity,userState,userZip,userEmail,userName,passWord,res,validationResult) {
	var userRole;
	if(userName === "jadmin") {
		userRole = "admin";
	}
	else {
		userRole = "customer"
	}
	var insertData = {
	    firstname: firstName,
		lastname: lastName,
		address: userAddress,
		city: userCity,
		state: userState,
		zip: userZip,
		email: userEmail,
		username: userName,
		password: passWord,
		role: userRole,    
  	};
  	if(validationResult == true) {
  		connection.query('INSERT INTO user_credentials set ? ',insertData,function(err,rows) {            
		    if(err) {
		      res.json({"message":"there was a problem with your registration"});
		      console.log("Error Selecting : %s ",err );
		    }
		    else {
		      res.json({"message":"Your account has been registered"});	
		    }
  		});
  	}
  	else {
  		res.json({"message":"there was a problem with your registration"});
  	}
}

module.exports = router;