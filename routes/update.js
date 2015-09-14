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
  
});

module.exports = router;