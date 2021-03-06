const passport = require('passport');
require('./strategies/local.strategy.js')();

module.exports = function passportConfig(app) {

    app.use(passport.initialize());
    app.use(passport.session());

    // stores user in session
    passport.serializeUser((user, done)=> {
        done(null, user);
    });

    // retrives user from session
    passport.deserializeUser((user, done)=> {
        done(null, user);
    });
}