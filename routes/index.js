var express = require('express');
var router = express.Router();
var app = express();
var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); 


// app.use(cookieParser());
// //app.use(expressSession({secret: 'secret',cookie:{maxAge:3600}}));
// 
// app.use(expressSession({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         secure: false,
//         maxAge: 3600
//     }
// }));

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.user){
        console.log(req.session.user.name);
    }
  res.render('layout', { title: 'VMCare' });
});

router.get('/login', function(req, res, next) {  
    
//    if (req.session.userName)
//    {
//      res.render('health')
//    }
//    else
//    { 
     res.render('login');
 //  }
});

router.get('/services', function(req, res, next) {
      //console.log('User session in services'+ req.session.user.name);
    if (req.session.user){
        console.log(req.session.user.name);
        //req.session.regenerate(function(err) {
       req.session.cookie.expires = false;      
  // will have a new session here
        res.render('services'); 

//});
      
    }
    else
    {
          res.redirect(301,'http://localhost:1337/login');
          //res.render('login'); 
    }
});


router.get('/health', function(req, res, next) {  
    console.log('entered inside the health');
     //console.log('User session in health'+ req.session.user.name);
   if(req.session.user)
    {
        console.log('requested user session is : ' + req.session.user.name);
        //res.render('health',{ user: req.session.user });
        res.render('health',{ user: req.session.user });
    }
    else 
    {
        res.redirect(301,'http://localhost:1337/login');  
    }
});
router.get('/specialist', function(req, res, next) {  
  res.render('specialist',{ user: req.session.user });
});
router.get('/search', function(req, res, next) {  
  res.render('search',{ user: req.session.user });
});
router.get('/board', function(req, res, next) {  
  res.render('board');
});
router.get('/registerdetails', function(req, res, next) {
  res.render('registerDetails');
});

router.get('/myhealthproblems', function(req, res, next) {
  res.render('myhealthproblems');
});
router.get('/mymedications', function(req, res, next) {
  res.render('mymedications');
});
router.get('/mylifestyle', function(req, res, next) {
  res.render('mylifestyle');
});
router.get('/myfamilyhistory', function(req, res, next) {
  res.render('myfamilyhistory');
});

router.get('/mypharmacies', function(req, res, next) {
  res.render('mypharmacies');
});

router.get('/mydoctors', function(req, res, next) {
  res.render('mydoctors');
});
// router.post('/health', function(req, res,next) {  
//   console.log(req.body.fname)
//   var user = String(req.body.user);
//   console.log(user); 
//   // if(user == 'bharat')
//   //   res.redirect(301,'/health');
//   if (user == 'bharat.arora7@gmail.com')
//     res.render('health',{ username: 'bharat' });
//   if (req.body.fname != undefined)
//     res.render('health',{ username: req.body.fname });
//    res.redirect(301,'/health');
// });

module.exports = router;
