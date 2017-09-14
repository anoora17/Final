$(document).ready(function() {
  // Getting references to the name inout and author container, as well as the table body
  var nameInput = $("#product-name");
  var descInput = $('#product-desc');
  var priceInput = $('#product-price');
  var productList = $("tbody");
  var productContainer = $(".product-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#product-form", handleProductFormSubmit);
  $(document).on("click", ".delete-product", handleDeleteButtonPress);

  // Getting the intiial list of Authors
  getProducts();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleProductFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    if (!descInput.val().trim().trim()) {
      alter("You must enter a description.");
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertProduct({
      name: nameInput.val().trim(),
      description: descInput.val().trim(),
      price: priceInput.val().trim()
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertProduct(productData) {
    //console.log("instertproduct in product.js");
    $.post("/api/products", productData)
      .then(getProducts);
  }

  // Function for creating a new list row for authors
  function createProductRow(productData) {
    var newTr = $("<tr>");
    newTr.data("product", productData);
    newTr.append("<td>" + productData.name + "</td>");
    newTr.append("<td>" + productData.price + "</td>");
    newTr.append("<td>" + productData.description + "</td>");
    newTr.append("<td><a href='/cms?product_id=" + productData.id + "'>Update Product Info</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-product'>Delete Product</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getProducts() {
    //console.log("in getproducts function");
    $.get("/api/products", function(data) {
      //console.log("right after get");
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createProductRow(data[i]));
      }
      renderProductList(rowsToAdd);
      nameInput.val("");
      priceInput.val("");
      descInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderProductList(rows) {
    productList.children().not(":last").remove();
    productContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      productList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.html("You must create a Product before you can create an Order.");
    productContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("product");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/products/" + id
    })
    .done(getProducts);
  }
});
