const purify = require("purify-css")

var content = ['./dist/*.js', './Views/**/en/*.cshtml'];
var css = ['./*.css'];
var options = {
  output: "./index.css",
  minify: true
}
purify(content, css, options, function (purifiedResult) {
  console.log(purifiedResult);
});

// purify(content, css, options)


// var content = '<button class="button-active"> Login </button>';
// var css = '.button-active { color: green; }   .unused-class { display: block; }';

// console.log(purify(content, css));