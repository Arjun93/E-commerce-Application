var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  //host     : 'localhost',
  host     : 'ecommerce.ccwtwgtut47e.us-east-1.rds.amazonaws.com',
  port : '3306',
  user     : 'root',
  password : '12312312',
  database :'ecommerce',
});

router.post('/', function(req, res, next) {
	var userName = req.session.endUser;
	var personRole = req.session.role;
	if(personRole == 'admin') {
		var productid = req.body.productId;
		var productDesc = req.body.productDescription;
		var productTitle = req.body.productTitle;
		console.log(productid);
		console.log(productTitle);
		console.log(productDesc);

		var query = "UPDATE product_information SET ";
		
		if(typeof productDesc != 'undefined' && productDesc!="") {
			 query += "product_description='"+productDesc+"',";
		}

		if(typeof productTitle != 'undefined' && productTitle!="") {
			query += "product_title='"+productTitle+"',";
		}

		var finalQuery = query.substring(0,query.length-1);
		finalQuery = finalQuery+ " WHERE product_id="+productid+"";


		connection.query(finalQuery,function(err,rows) {            
		    if(err) {
		      console.log("Error Selecting : %s ",err );
		      res.json({"message":"There was a problem with this action"});
		    }
		    else {
		      res.json({"message":"The product information has been updated"});
		    }	        
  		});

	    //res.json({"message":"hello"});
	}
	else {
	  res.json({"err_message":"you are not authorized!"});
	}
});

module.exports = router;