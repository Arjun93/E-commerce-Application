var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/*Handling logout*/
router.post('/', function(req, res, next) {
  var userInputSessionId = req.body.sessionID;
  var userSessionId = req.sessionID;
  console.log(userInputSessionId);
  console.log(userSessionId);
  var userName = req.session.endUser;
  
  if (typeof userName != 'undefined') {
  //if (userInputSessionId === userSessionId) {
    res.json({"message":"You have been logged out"});
    req.session.destroy();
  }
  else {
    res.json({"message":"You are not currently logged in"}); 
  }
});

module.exports = router;
