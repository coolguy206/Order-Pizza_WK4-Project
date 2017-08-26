// business logic
function Pizza (size, toppings) {
  this.size = size;
  this.toppings = toppings;
}


Pizza.prototype.getCost = function(){
  //these are the valuse from Pizza prototype
  //console.log(this.size);
  //console.log(this.toppings);

  //if there was already results from previous submit clear it out
  $('.pizza-details').children().remove();

  //clear out the cost
  $('.order').text('');

  //create variable for the toppings total
  var toppingsTotal = 0;

 // create variable for pizza size text
  var sizeText = this.size.text;
  console.log(sizeText);

  // turn the pizza size into a number
  var sizeCost = Number(this.size.price);
  console.log(sizeCost);

  //create variable for toppings array
  var toppings = this.toppings;

  //loop through the array
  $(toppings).each(function(i,val){
    //create variable for price and turn in into a number
    var price = Number(val.price);
    //console.log(price);

    toppingsTotal = toppingsTotal + price;
  });

  //console.log(toppingsTotal);

  //add the size and toppings
  var grandTotal = sizeCost + toppingsTotal;
  // console.log(grandTotal);

  //output to page the pizza details
  $('.pizza-details').append('<h4>'+sizeText+' Pizza</h4><ul class="pizza-toppings"></ul>');

  //add the toppings to the <ul>
  $(toppings).each(function(i,val){
    $('.pizza-toppings').append('<li>'+val.name+'</li>');
  });

  //output the cost to the page
  $('.order').append('cost: $'+grandTotal);

  //show the results
  $('.your-pizza').show();

};

// user-interface logic
$(document).ready(function() {
  //toppings array
  var toppings = [{name:'pepperoni', price:2},{name:'grilled chicken', price:2},{name:'mushroom', price:1}, {name:'pineapple', price:1},{name:'spinach', price:1},{name:'onions', price:1},{name:'anchovy', price:2}];
  //loop through toppings and output to page
  toppings.forEach(function(val,i){
    //add the checkboxes to the page
    $('.toppings').append('<div><label>'+val.name+'</label> <input type="checkbox" name="toppings" value="'+val.name+'" data-price="'+val.price+'" checked></div>');

    //add the price of the toppings to the page
    $('.toppings-price').append('<li>'+val.name+' $'+val.price+'</li>');
  });




  $("form").submit(function(event){
    //dont submit the form
    event.preventDefault();

    //if the results are showing hide it
    $('.your-pizza').hide();

    //make array to hold selected toppings
    var selectedToppings = [];

    //variable for the checkboxes
    var checkboxes = $('.toppings input');
    //console.log(checkboxes);

    //check if at least on checkbox is selected
    var checked = $('.toppings input[type="checkbox"]:checked').length;
    // console.log(checked;

    // if no checkboxes selected output the alert message
    if(checked == 0){
      $('.toppings').prepend('<h3>Please select at least one topping</h3>');
      //stop the submit event
      return true;

    // else continue  
    } else {

      //in case there was a alert message remove it
      $('.toppings h3').remove();

      //loop through checkboxes and check if checked then push to selectedToppings
      $(checkboxes).each(function(i,val){
        var elem = $(val);
      
        if(elem.prop('checked')){
          //console.log(elem.attr('value'));
          selectedToppings.push({name: elem.attr('value'), price: elem.attr('data-price')});

        }
      });

      //console.log(selectedToppings);

      //get the selected pizza size cost
      var selectedSizeCost = $('.size').val();
      //console.log(selectedSize);

      //get the selected pizza size text
      var selectedSizeText = $('.size option:selected').attr('data-size');
      //console.log(selectedSizeText);

      //create a variable that is an object for the selected size
      var selectedSize = {text:selectedSizeText ,price:selectedSizeCost};
      console.log(selectedSize);

      //your current pizza
      var myPizza = new Pizza(selectedSize, selectedToppings);
      // console.log(myPizza);

      //call getCost
      myPizza.getCost()

    }

  });
});
