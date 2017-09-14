// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/manager", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/customer-manager.html"));
  });

  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/cms.html"));
  });

  // blog route loads blog.html
  app.get("/orders", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/orders.html"));
  });

  // authors route loads author-manager.html
  app.get("/customers", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/customer-manager.html"));
  });

  app.get("/products", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/product-manager.html"));
  });

  app.get("/orderform", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/order_form.html"))
  })

};
