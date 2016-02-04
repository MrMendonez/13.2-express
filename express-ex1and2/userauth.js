// Write an authentication app that keeps a user logged in
// Create middleware to check if the user is logged in before allowing access to the account page
// Have fun

// var express = require('express');
// var app = express();
// var session = require('express-session');
// var middleware = require('./middleware');
// var PORT = 3030;

// app.use(middleware.myLoggingMiddleware);
// app.use(session({
//   secret: "24ctuLA",
//   cookie: {
//     maxAge: 60000
//   },
//   saveUninitialized: true,
//   resave: false
// }));

// app.use(bodyparser.urlencoded({extended:false}));

// app.get("/", function(req, res) {
//   res.sendFile(process.cwd() + "/home.html");
// });

// app.get("/login", function(req, res){
//  res.sendFile(process.cwd() + "/login.html");
// });

// app.post("/login", function(req, res) {
//   console.log(req.body);
//   var myHTML = "<h1>Email: " + req.body.email + "</h1>";
//   myHTML += "<h1>Password: " + req.body.password + "</h1>";
//   if(req.body.email === "abc@abc.com" && req.body.password === "abc") {
//     res.redirect('/account');
//   }
//   else {
//     res.redirect('/help');
//   }
// });

// app.get("/account", function(req, res){
//  res.sendFile(process.cwd() + "/account.html");
// });

// app.listen(PORT, function() {
//   console.log("App listening on port %s", PORT);
// });





// Jean Carlos's solution:

var express = require('express');
var bodyparser = require('body-parser');
var session = require('express-session');


var app = express();
var PORT = 8080;


app.use(session({
 secret: 'crazy secret boom!!',
 cookie: {
     maxAge: 60000
   },
 saveUninitialized:true,
 resave: false
 }
));

app.use(bodyparser.urlencoded({extended:false}));

function middleware(req,res,next){
 var sess = req.session;

 if(sess.authenticated === undefined || sess.authenticated === false){
   res.redirect("/login");
 }
 next();

}


app.get('/login', function(req,res){
res.sendFile(process.cwd() + "/login.html");
});

app.post('/login', function(req,res){
 console.log(req.body);
 if(req.body.Email === "me@me.com" && req.body.Password === "guest"){
   req.session.authenticated = true;
   res.redirect("/account");
 }
 else{
   req.session.authenticated = false;
   res.redirect("/help");
 }

});

app.get('/account', middleware, function(req,res){
 res.end('<h1>'+"Account!!"+'</h1>');
});

app.get('/', function(req, res){
 res.sendFile(process.cwd() + "/home.html");

});

app.listen(PORT,function(){
 console.log("listening on port: "+PORT);
});
