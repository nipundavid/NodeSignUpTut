const express = require('express');
const { MongoClient } = require('mongodb');

const authRouter = express.Router();

function router(nav) {
    authRouter.route('/')
    .get((req,res)=> {
        res.send('This is a sign up page');
    });

    authRouter.route('/signup')
    .post((req,res)=> {
        //create user
        const { username, password } = req.body;
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function addUser() {
            let client;
            try {
                client =  await MongoClient.connect(url);
                console.log("Connected to the server");

                const db = client.db(dbName);
                const col = db.collection('users');
                const user = { username, password };
                const result = await col.insertOne(user);

                req.login(result.ops[0], () => {
                    res.redirect('/auth/profile');
                });
            }catch(err) {
                console.log(err);
            }
        }());
    });

    authRouter.route('/profile')
    .get((req,res) => {
        res.json(req.user);
    });
    
    return authRouter;
}


module.exports = router;