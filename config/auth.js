// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '598171076960591', // your App ID
		'clientSecret' 	: '10d4eebe496c428f1c11aaa41e5408cd', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	}
}
