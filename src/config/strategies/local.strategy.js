const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy() {
    passport.use(new Strategy(
        {
            usernameField : 'username',
            passwordField : 'password'
        },(username, password, done) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function addUser() {
                let client;
                try {
                    client =  await MongoClient.connect(url);
                    console.log("Connected to the server");

                    const db = client.db(dbName);
                    const col = db.collection('users');

                    const user = await col.findOne({username});

                    if(user !=null && user.password === password) {
                        done(null, user);
                    }else {
                        done(null, false);
                    }
                    
                    console.log('-------------------'+user.password+'----'+password);
                }catch(err) {
                    console.log(err);
                }
                client.close();
            }());
        }
    ));
}  