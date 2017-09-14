var db = require("../models");
// Jay routs for Admin interface
module.exports = function(app) {
  app.get("/api/customers", function(req, res) {
    //Join Customer to thier Orders
    db.Customer.findAll({
      include: [db.Orders]
    }).then(function(dbCustomer) {
      res.json(dbCustomer);
    });
  });

  app.get("/api/customers/:id", function(req, res) {
    // Gets singe Customer and their Orders
    db.Customer.findOne({
      include: [db.Orders],
      where: {
        id: req.params.id
      }
    }).then(function(dbCustomer) {
      res.json(dbCustomer);
    });
  });

  app.post("/api/customers", function(req, res) {
    db.Customer.create(req.body).then(function(dbCustomer) {
      res.json(dbCustomer);
    });
  });

  app.delete("/api/customers/:id", function(req, res) {
    db.Customer.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCustomer) {
      res.json(dbCustomer);
    });
  });

};
