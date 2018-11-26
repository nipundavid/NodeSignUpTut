const express = require('express');

const signUpRouter = express.Router();

function router(nav) {
    signUpRouter.route('/')
    .get((req,res)=> {
        res.send('This is a sign up page');
    });

    signUpRouter.route('/signup')
    .post((req,res)=> {
        res.json(req.body);
    });
    
    return signUpRouter;
}


module.exports = router;