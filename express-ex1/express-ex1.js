// * Create a web app using Express that has 4  routes
//   * Home
//   * Login Page
//   * Account Page
//   * Help Page
// * If a user correctly logs in, send them to the Account Page (the correct credentials are whatever you want)

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = 3000;

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/home.html");
});

app.get('/login', function(req, res) {
  res.sendFile(process.cwd() + "/login.html");
});

app.get("/account", function(req, res) {
  res.sendFile(process.cwd() + "/account.html");
});

app.get("/help", function(req, res) {
  res.sendFile(process.cwd() + "/help.html");
});

app.post("/login", function(req, res) {
  console.log(req.body);
  var myHTML = "<h1>Email: " + req.body.email + "</h1>";
  myHTML += "<h1>Password: " + req.body.password + "</h1>";
  if(req.body.email === "abc@abc.com" && req.body.password === "abc") {
    res.redirect('/account');
  }
  else {
    res.redirect('/help');
  }
  
});

app.listen(PORT, function() {
  console.log("App listening on port %s", PORT);
});