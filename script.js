Handlebars.registerHelper("formatGrade", function(property) {
  return "Has a " + property;
});

Handlebars.registerHelper("formatName", function(property1, property2) {
  return new Handlebars.SafeString(
    "First Name: " + property1 + " Last Name: <strong>" + property2 + "</strong>"
  );
});

Handlebars.registerHelper("studentID", function(property) {
  if (property){
    var uid = property.toString();
    return "( " + uid.substr(0,3) + " ) - " + uid.substr(3, uid.lenght);
  };
});

Handlebars.registerHelper("warming", function(options) {
  return options.fn(this).toUpperCase();
});


Handlebars.registerHelper('link', function(object) {
  return new Handlebars.SafeString(
    "<a href='student/" + object + ".html'>" + "link" + "</a>"
  );
});


$(document).ready(function(){

var people = "";
var person = "";
var template = $("#template").html();
var compiled = Handlebars.compile(template);
const params = new URLSearchParams(window.location.search);
var useid = params.get('id');

// fetch('data.json')
//   .then(function(response) {
//   return response.json();
//   })
//   .then(function (data) {
//     console.log(data)
//     people = data;
//     var render = compiled(people);
//     $(".container").html(render);
//   })



fetch('data.json')
  .then(function(response) {
      return response.json();
  })
  .then(function (data) {
    // console.log(data)
    // console.log(useid);
    //
    if ($("body").hasClass("details")) { // if details page
      const finder = data.names.find(element => element.uid == useid); // find user
      person = finder;
      var render = compiled(person);
      $(".container").html(render);

    } else {
      people = data;
      var render = compiled(people);
      $(".container").html(render);
    }
  })


});
