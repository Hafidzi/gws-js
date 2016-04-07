"use strict";

Handlebars.registerHelper("or", function(first, second) {
  return first || second;
});
Handlebars.registerHelper("ifnull", function(first, second) {
  if (!!first || first === "" || first === 0 || first === false) {
    return first;
  } else {
    return second;
  }
});
Handlebars.registerHelper("round", function(first, second) {
  var r = Math.pow(10, second || 0);
  return Math.round(first * r) / r;
});
Handlebars.registerHelper("equals", function(first, second, options) {
  if (first === second) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
Handlebars.registerHelper("json", function(obj) {
  return JSON.stringify(obj, null, 2);
});
