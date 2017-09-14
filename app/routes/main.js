var express  = require('express');
var router   = express.Router();
var Product  = require('../models/')["Product"];
var db       = require('../models');

	

	router.get('/', function (req, res) {
		res.render('index')
	});

	router.get('/about', function(req, res){
		res.render('about')
	})

	

 	router.get('/err', function (req, res, next) {
 		res.render('err')
 		
 	})
// render the data from data base
router.get('/cart', function(req, res){
	db.Product.findAll({}).then(function(cakedata) {
		var productChunks = [];
		var productinRow   = 1;
		for(var i =0; i <cakedata.length ; i++){
			  productChunks.push(cakedata.slice(i, i + productinRow))
		}
	res.render('dashboard',{ products: productChunks})

 });

})



      

module.exports = router;
