var express  = require('express');
var router   = express.Router();
var Product  = require('../models/')["Product"];
var db       = require('../models');



router.get('/products', function(req, res, next ){
		res.render('product-manager')
	})


router.get("/products/all", function(req, res) {
    //Join Customer to thier Orders
    db.Product.findAll({}).then(function(dbProduct) {
     
      res.render('product-manager')
    });
  });

router.post("/cms", function(req, res) {
    console.log("req body: " + req.body);
    db.Product.create(req.body).then(function(dbProduct) {
      console.log(dbProduct);
      res.render('customer-manager');
    });
 
 });

  router.delete("/products/:id", function(req, res) {
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    })
  });

module.exports = router;