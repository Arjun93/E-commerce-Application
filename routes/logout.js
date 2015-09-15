var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/*Handling logout*/
router.post('/', function(req, res, next) {
  var userInputSessionId = req.query.sessionID;
  var userSessionId = req.sessionID;
  
  if (userInputSessionId === userSessionId) {
    res.json({"message":"You have been logged out"});
    req.session.destroy();
  }
  else {
    res.json({"message":"You are not currently logged in"}); 
  }
});


module.exports = router;
