$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select
  console.log('1');
  var emailInput = $("#email");
  var nameInput = $("#name");
  var cmsForm = $("#cms");
  //var authorSelect = $("#author");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var OrderId;
  var CustomerId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?order_id=") !== -1) {
    OrderId = url.split("=")[1];
    getOrderData(orderId, "order");
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?customer_id=") !== -1) {
    customerId = url.split("=")[1];
  }
console.log('2');
  // Getting the authors, and their posts
  getCustomers();
console.log('3');
  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!nameInput.val().trim() || !emailInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      email: emailInput
        .val()
        .trim(),
      name: nameInput
        .val()
        .trim(),
      //AuthorId: authorSelect.val()
    };
console.log('4');
    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newCustomer.id = customerId;
      updateCustomer(newCustomer);
    }
    else {
      submitCustomer(newCustomer);
    }
  }
console.log('5');
  // Submits a new post and brings user to blog page upon completion
  function submitCustomer(customer) {
    $.post("/api/customers", customer, function() {
      window.location.href = "/blog";
    });
  }
console.log('6');
  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  function getCustomerData(id, type) {
    var queryUrl;
    switch (type) {
      case "orders":
        queryUrl = "/api/orders/" + id;
        break;
      case "customers":
        queryUrl = "/api/customers/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.CustomerId || data.id)
        // If this post exists, prefill our cms forms with its data
        emailInput.val(data.email);
        nameInput.val(data.name);
        //authorId = data.AuthorId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }
console.log('7');
  // A function to get Authors and then render our list of Authors
  function getCustomers() {
    console.log('8');
    $.get("/api/customers", renderCustomerList);
  }
  
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderCustomerList(data) {
    console.log('9');
    if (!data.length) {
      window.location.href = "/customers";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createCustomerRow(data[i]));
    }
    customerSelect.empty();
    console.log(rowsToAdd);
    console.log(customerSelect);
    customerSelect.append(rowsToAdd);
    customerSelect.val(customerId);
  }

  // Creates the author options in the dropdown
  function createCustomerRow(customer) {
    var listOption = $("<option>");
    listOption.attr("value", customer.id);
    listOption.text(customer.name);
    return listOption;
  }

  // Update a given post, bring user to the blog page when done
  function updateCustomer(customer) {
    $.ajax({
      method: "PUT",
      url: "/api/customers",
      data: customer
    })
    .done(function() {
      window.location.href = "/blog";
    });
  }
});
