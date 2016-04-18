// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
// });

// module.exports = router;



var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/';
var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); 
var db = require(libs + 'db/mongoose');

//Return the use information based on the bearer token
router.get('/info', passport.authenticate('bearer', { session: false }),
    function(req, res) {
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`.  It is typically used to indicate scope of the token,
        // and used in access control checks.  For illustrative purposes, this
        // example simply returns the scope in the response.
    //    if (req.session.userName)
    //    {
    //    console.log('user session already exists :' + req.session.userName);
    //    }
    //    else{
    //        req.session.userName = 'vbbhadj';;           
    //    }
    //     
        res.json({ 
        	user_id: req.user.userId, 
        	name: req.user.username, 
        	scope: req.authInfo.scope 
        });
        
    }
);

module.exports = router;