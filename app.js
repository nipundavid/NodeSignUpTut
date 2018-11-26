const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');

const nav = [
	{ link: '/books', title: 'Books' },
	{ link: '/authors', title: 'Authors' }
];

const signUpRouter = require('./src/routes/signUpRoutes')(nav);
app.use('/auth',signUpRouter);

app.get('/',(req,res) => {
    res.render('signup.ejs');
}).listen(port); 