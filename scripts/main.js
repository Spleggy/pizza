//global variables
var prevPrice = 0;
var amount = 0;

function main() {

  var form = document.getElementById("contact_form");
  var order_form = document.getElementById("order_form");
  
  //if the form exists ie if its on the contact page
  if (form) 
  {
    form.addEventListener("submit", validateForm);
  }
  
  //check if order form exists
  if (order_form)
  {
    order_form.addEventListener("submit", validateOrder);
    order_form.addEventListener("reset", resetOrder);
  }
  

  setInterval(function() {
    // set up a new date object 
    var today = new Date();
    //extract the hour min and seconds and store them in a variable 
    var curr_hour = today.getHours();
    var curr_minute = today.getMinutes();
    var curr_second = today.getSeconds();

    //if statements to add a 0 to the front if it is less than 10
    if (curr_hour < 10) {
      curr_hour = "0" + curr_hour;
    }
    if (curr_minute < 10) {
      curr_minute = "0" + curr_minute;
    }
    if (curr_second < 10) {
      curr_second = "0" + curr_second;
    }
    //extract the day, month and year and store them

    var curr_day = today.getDate();

    // get month and add 1 as it starts at 0
    var curr_month = today.getMonth() + 1;
    var curr_year = today.getFullYear();

    //if the date or month is less than 10 then add a 0
    if (curr_day < 10) {
      curr_day = "0" + curr_day;
    }
    if (curr_month < 10) {
      curr_month = "0" + curr_month;
    }
    
    //convert into 1 date and 1 time
    var curr_date = curr_day + "/" + curr_month + "/" + curr_year;

    var curr_time = curr_hour + ":" + curr_minute + ":" + curr_second;
    //display current time
    document.getElementById("time").innerHTML = curr_time;
    document.getElementById("date").innerHTML = curr_date;
  }, 1000);

}

//image rollover
function changeImage(imgToChange, newImage) {
  document.getElementById(imgToChange).src = newImage;
}

//check if the contact form is valid
function validateForm() {
  var form = document.getElementById("contact_form");

  //first name
  if (form.first_name.value == "") {
    document.getElementById("formError").style.display = "block";
    event.preventDefault();
  }

  //last name
  if (form.last_name.value == "") {
    document.getElementById("formError").style.display = "block";
    event.preventDefault();
  }

  //email
  if (form.email.value == "") {
    document.getElementById("formError").style.display = "block";
    event.preventDefault();
  }

  //email confirmation
  if (form.email_confirmation.value == "") {
    document.getElementById("formError").style.display = "block";
    event.preventDefault();
  }

  //emails not matching
  if (form.email.value != form.email_confirmation.value) {
    //unhide email not matching tag
    document.getElementById("emailConfirmError").style.display = "block";
    event.preventDefault();
  }
  
  //emails matching
  if (form.email.value == form.email_confirmation.value) {
    //unhide email not matching tag
    document.getElementById("emailConfirmError").style.display = "none";
    
  }

  //message
  if (form.message.value == "") {
    //reveal 
    document.getElementById("formError").style.display = "block";
    event.preventDefault();
  }

}

//validate the contact form text colour
function validateColour() {
  var form = document.getElementById("contact_form");

  //first name
  if (form.first_name.value == "") {
    //change background colour
    document.getElementById("first_name").style.backgroundColor = "red";
  }
  else {
    //keep background colour as nothing
    document.getElementById("first_name").style.backgroundColor = "";
  }

  //last name
  if (form.last_name.value == "") {
    //change background colour
    document.getElementById("last_name").style.backgroundColor = "red";
  }
  else {
    //keep background colour as nothing
    document.getElementById("last_name").style.backgroundColor = "";
  }

  //email
  if (form.email.value == "") {
    //change background colour
    document.getElementById("email").backgroundColor = "red";
  }
  else {
    //keep background colour as nothing
    document.getElementById("email").style.backgroundColor = "";
  }

  //email confirmation
  if (form.email_confirmation.value == "") {
    //change background colour
    document.getElementById("email_confirmation").style.backgroundColor = "red";
  }
  else {
    //keep background colour as nothing
    document.getElementById("email_confirmation").style.backgroundColor = "";
  }

  //emails not matching
  if (form.email.value != form.email_confirmation.value) {
    document.getElementById("email_confirmation").style.backgroundColor = "red";
    document.getElementById("email").style.backgroundColor = "red";
  }
  else {
    document.getElementById("email_confirmation").style.backgroundColor = "";
    document.getElementById("email").style.backgroundColor = "";
  }

  //message
  if (form.message.value == "") {
    //change background colour
    document.getElementById("message").style.backgroundColor = "red";
  }
  else {
    //keep background colour as nothing
    document.getElementById("message").style.backgroundColor = "";
  }

}


//check all checkboxes, make sure atleast 1 base and topping is checked before validating
function validateOrder()
{
  var order = document.getElementById("order_form");
  var validBase = false;
  var validTopping = false;
  
  //check base checkboxes
  for (var i = 1; i <= 4; i++)
  {
    if (order.base[i].checked)
    {
      //stop looping
      i = 8;
      validBase = true;
    }
    else if (i == 4)
    {
      validBase = false;
    }
  }
  
  //check toppings checkboxes
  for (i = 1; i < 7; i++)
  {
    if (order.topping[i].checked)
    {
      i = 8;
      validTopping = true;
    }
    else if (i == 6)
    {
      validTopping = false;
    }
  }
  
  //check if base and topping are valid
  if (validBase && validTopping)
  {
    //if valid hide error message
    document.getElementById("checkboxError").style.display = "none";
  }
  else
  {
    //reveal error message
    document.getElementById("checkboxError").style.display = "block";
    //stop submitting
    event.preventDefault();
  }
  
  
  //address
  if (order.deliv_addr.value == "") {
    //reveal delivery error message
    document.getElementById("deliveryError").style.display = "block";
    //stop form from submitting
    event.preventDefault();
  }

  //post code
  if (order.post_code.value == "") {
    //reveal delivery error message
    document.getElementById("deliveryError").style.display = "block";
    //stop form from submitting
    event.preventDefault();
  }
}


//calculate the total price for the base
function baseTotal(checkbox)
{
  //round to 2dp
  var basePrice = Number(parseFloat(checkbox.value).toFixed(2));
  var change;
  
  //check the checkbox to see if unchecked or checked
  if (checkbox.checked) 
  {
    //work out whether to add or subtract from the total
    change = "add";
    runningTotal(basePrice, change);
    
  }
  
  //if a radio button was checked before
  if (prevPrice != 0)
  {
    change = "subtract";
    runningTotal(prevPrice, change);
  }

  //save the previous radio button value
  prevPrice = basePrice;
}

//calculate the total price for all toppings selected
function checkboxSum(checkbox)
{
  var checkboxPrice = Number(parseFloat(checkbox.value).toFixed(2));
  var change;
  
  //check the checkbox to see if unchecked or checked
  if (checkbox.checked) 
  {
    change = "add";
    runningTotal(checkboxPrice, change);
  }
  else
  {
    change = "subtract";
    runningTotal(checkboxPrice, change);
  }
  
}

//calculate the total as each checkbox is changed
function runningTotal(updateAmount, change)
{
  var total = document.getElementById("total");
 
  //update total
  if (change == "add")
  {
    amount += updateAmount;
  }
  else
  {
    amount -= updateAmount;
  }
  
  //add the new 2dp total and force it to be a positive zero
  total.innerHTML = "Total: £" + Math.abs(amount).toFixed(2);
}

//reset everything on the page
function resetOrder()
{
  var order = document.getElementById("order_form");
  var total = document.getElementById("total");
  
  //for every element in the form reset everything
  for (var i = 0; i < order.length; i++)
  {
    //reset error messages
    document.getElementById("checkboxError").style.display = "none";
    document.getElementById("deliveryError").style.display = "none";
    
    //reset all checkboxes and textboxes
    order[i].checked = false;
    
    //reset total
    amount = 0;
    total.innerHTML = "Total: £" + Math.abs(amount).toFixed(2);
  }
}