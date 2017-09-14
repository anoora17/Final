function Cart(){
console.log("Cart Cart Cart")
		this.items = [];
		this.totalQty = 0;
		this.totalPrice = 0;
		console.log("============= myCart is Null =============")

	// if (myCart) {
	// 	this.items= myCart.items;
	// 	this.totalQty = parseInt(myCart.totalQty);
	// 	this.totalPrice = parseFloat(myCart.totalPrice);
	// 	console.log("============= myCart is Not Null =============")
	// } else {
	// 	this.items = [];
	// 	this.totalQty = 0;
	// 	this.totalPrice = 0;
	// 	console.log("============= myCart is Null =============")
	// }


	};

Cart.prototype.add = function(item) {
	if (item)
		{
		console.log("============= item is Not Null =============") 
		console.log("============= " + item.quantity) 
		this.items.push(item);
		this.totalQty += parseInt(item.quantity);
		this.totalPrice += parseFloat(item.price) * parseInt(item.quantity);

		}
		else
		{
		console.log("============= item is Null =============")
		}

};
console.log("end cart")
module.exports = Cart;
//      













	//var itemsNo = 0;
//           var total  = 0;
//          var storedItem  = [];	

// var Cart = function (name , price, quantity){
// 		 this.name    = name;
// 		 this.price   = price;
// 		 this.quantity     =  quantity;


//   }
//  Cart.prototype.addItemToCart = function(a, b, c){
        	  
        	     
// 			   storedItem.push(new Cart(a, b, c));
// 			   console.log([storedItem])
 
// 			   return   itemsNo = storedItem.length; 
				
//       }

// 	 Cart.prototype.checkout = function(name, price, quantity){
// 	 		for(var i = 0; i<= itemsNo; i++) {
// 				total = price *  quantity;

// 			}
// 			return  total
//     console.log(total)
			
// 	};
// 			  Cart.prototype.lits = function(a,b,c){
// 			  	storedItem.push(new Cart(a, b, c));
// 			  	return storedItem;
// 			  }

// 	module.exports = Cart;