const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'library' }));

const port = process.env.PORT || 3000;

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');

const nav = [
];

const authRouter = require('./src/routes/auth.js')(nav);
app.use('/auth',authRouter);

app.get('/',(req,res) => {
    res.render('signup.ejs');
}).listen(port); 