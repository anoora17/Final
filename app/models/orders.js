module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    orderdate: DataTypes.DATE
        
  });

  Order.associate = function(models) {
    Order.belongsTo(models.Customer);
    Order.hasMany(models.Orderitems, {
      onDelete: "cascade"
    });
  };

  return Order;
};
