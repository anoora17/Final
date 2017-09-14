module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(5,2),
    description: DataTypes.STRING,
    imagepath: DataTypes.STRING  
  });

  return Product;
};
