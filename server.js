const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return  text.toUpperCase();
});

app.set('view engine', 'hbs')

app.use((req, res, next) => {
	var now = new Date().toString();
	
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.');
		}
	});
	
	next();
});

//app.use((req, res, next) => {
//	res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    
	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcome: 'Welcome to home page',
		currentYear: new Date().getFullYear()
	});
   //res.send('<h1>Hello Express!</h1>');
});

app.get('/about', (req, res) => {
	//res.send('About page!');
	res.render('about.hbs', {
		pageTitle: 'about page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/portfolio', (req, res) => {
	//res.send('About page!');
	res.render('projects.hbs', {
		pageTitle: 'Our Projects',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request!'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});