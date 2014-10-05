var Animal = require('./models/animal');
var User = require('./models/user');

module.exports = function(app, passport) {

	require('../config/passport')(passport); // pass passport for configuration

	/*app.get('/home', function(req, res, next) {
		console.log(req.isAuthenticated());
		res.sendfile('./public/views/home.html');
	});

	app.get('/cadastro', function(req, res, next) {
		res.sendfile('./public/views/cadastro.html');
	});

	app.get('/animal/:id', function(req, res, next) {
		res.sendfile('./public/views/animal.html')
	});*/

	app.get('/api/animals', function(req, res, next) {
		console.log("GET - api/animals");

		//Animal.remove({"nome":"Pluto"}, function(){});

		Animal.find({}, function(err, animals) {
			if (err) {
				console.log("erro");
				res.send(err);
			}
			if (!animals.length) {
				//console.log("nao encontrou animais");
				res.send("nao encontrou");
			} else {
				/*//console.log("animais encontrados ");
				animals.forEach(function (animal) {
					console.log(JSON.stringify(animal));
					console.log("--------- TAGS "+animal.tags);
				});*/
				res.json(animals);
			}
		});
	});

	app.get('/api/animal/:id', function(req, res, next) {
		//changed from query to params after removing angularjs routing
		console.log("GET - api/animal/id = "+req.params.id);

		Animal.findById(req.params.id, function(err, animal) {
			if (err) {
				console.log("erro");
				res.send(err);
			} else {
				res.json(animal);
			}
		});
	});

	app.get('/api/animals/:userid', function(req, res, next) {

	});

	app.post('/api/animal', function(req, res, next) {
		console.log("POST - api/animal");

		console.log(req.body.tags);
		//console.log(req.body.localizacoes);

		var animal = new Animal({
			nome: req.body.nome,
			tipo: req.body.tipo,
			tags: req.body.tags,
			localizacoes: req.body.localizacoes,
			descricao: req.body.descricao,
			usuario_nome: "Maria Joaquina",
			eventos: req.body.eventos
		});

		animal.save(function(err) {
			if (err)
				res.send(err);

			res.send("success");
		});	
	});

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/home',
			failureRedirect : '/login'
		}));

	// route for logging out
	app.get('/logout', function(req, res) {
		console.log("logout");
		req.session.regenerate(function(){
    		req.logout();
    		res.redirect('/login');
    	});
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
	
}

function isAuthenticated(req, res, next) {
	if (req.session.passport.user)
		return next();

	res.redirect('/');
}
