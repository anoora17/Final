var db = require("../models");

module.exports = function(app) {
  app.get("/api/products", function(req, res) {
    //Join Customer to thier Orders
    db.Product.findAll({
      
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  app.get("/api/products/:id", function(req, res) {
    // Gets singe Customer and their Orders
    db.Product.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  app.post("/api/products", function(req, res) {
    console.log("req body: " + req.body);
    db.Product.create(req.body).then(function(dbProduct) {
      console.log(dbProduct);
      res.json(dbProduct);
    });
  });

  app.delete("/api/products/:id", function(req, res) {
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

};
