$(document).ready(function() {
  // Getting references to the name inout and author container, as well as the table body
  var nameInput = $("#customer-name");
  var emailInput = $('#customer-email');
  var customerList = $("tbody");
  var customerContainer = $(".customer-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#customer-form", handleCustomerFormSubmit);
  $(document).on("click", ".delete-customer", handleDeleteButtonPress);

  // Getting the intiial list of Authors
  getCustomers();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleCustomerFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    if (!emailInput.val().trim().trim()) {
      alter("You must enter a valid email address.");
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertCustomer({
      name: nameInput.val().trim(),
      email: emailInput.val().trim()
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertCustomer(customerData) {
    $.post("/api/customers", customerData)
      .then(getCustomers);
  }

  // Function for creating a new list row for authors
  function createCustomerRow(customerData) {
    var newTr = $("<tr>");
    newTr.data("customer", customerData);
    newTr.append("<td>" + customerData.name + "</td>");
    newTr.append("<td>" + customerData.email + "</td>");
    newTr.append("<td> " + customerData.Orders.length + "</td>");
    newTr.append("<td><a href='/orders?customerid=" + customerData.id + "'>Go to Orders</a></td>");
    newTr.append("<td><a href='/cms?customerid=" + customerData.id + "'>Create new Order</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-customer'>Delete Customer</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getCustomers() {
    $.get("/api/customers", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createCustomerRow(data[i]));
      }
      renderCustomerList(rowsToAdd);
      nameInput.val("");
      emailInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderCustomerList(rows) {
    customerList.children().not(":last").remove();
    customerContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      customerList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.html("You must create a Customer before you can create an Order.");
    customerContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("customer");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/customers/" + id
    })
    .done(getCustomers);
  }
});
