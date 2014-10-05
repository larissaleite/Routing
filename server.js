var express  = require('express');
var app      = express(); 								    // create app with express

var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 8080; 			// set the port
var connect = require('connect');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var flash    = require('connect-flash');

var session = require('express-session');

app.use(cookieParser('appsecret'));

app.use(session({ secret: 'appsecret', saveUninitialized: true, cookie: { secure: true, maxAge: new Date(Date.now() + 3600000) } }));

// configuration ===============================================================
var db = mongoose.connect('mongodb://127.0.0.1:27017/Routing');

// connect to mongoDB database
mongoose.connection.once('connected', function(error){
	if (error) {
		console.log("Error: " + error);
	} else {
		console.log("Connected to the database");
	}
});

app.use(express.static(__dirname + '/public')); 

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
