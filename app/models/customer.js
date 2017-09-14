'use strict';

module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    id: {
           type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
         },
    firstname: {
           type:DataTypes.STRING,
            notEmpty: true
         },
    lastname:{
          type:DataTypes.STRING,
          notEmpty: true
         },
    email:{
          type:DataTypes.STRING,
         validate:{isEmail:true}
        },
    password: {
         type:DataTypes.STRING,
           allowNull: false
        },
   addr1: {
         type: DataTypes.STRING
        },
   addr2: {
         type: DataTypes.TEXT
        },
    city: {
         type: DataTypes.TEXT
        },
   state: {
         type: DataTypes.TEXT
        },
    zipcode:{
        type:DataTypes.INTEGER,
          validate:{isNumeric: true}
       }

  });

  Customer.associate = function(models) {
    // Associating customers with orders
    // When an cutomer is deleted, also delete any associated orders
    Customer.hasMany(models.Order, {
      onDelete: "cascade"
    });
  };

  return Customer;
};
//
