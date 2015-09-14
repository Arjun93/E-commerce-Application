var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/*Handling logout*/
router.post('/', function(req, res, next) {
  var user_input_session = req.query.sessionID;
  var user_session_id = req.sessionID;
  if (user_input_session === user_session_id) {
    res.json({"message":"You have been logged out"});
    req.session.destroy();
  }
  else {
    res.json({"message":"You are not currently logged in"}); 
  }
  res.redirect('/');
});


module.exports = router;
