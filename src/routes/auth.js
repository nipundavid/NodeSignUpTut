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
        req.login(req.body, () => {
            res.redirect('auth/profile');
        });
        // res.json(req.body);
    });

    authRouter.route('/profile')
    .get((req,res) => {
        res.json(req.user);
    });
    
    return authRouter;
}


module.exports = router;