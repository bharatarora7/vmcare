
var express = require('express');
var passport = require('passport');
var request = require('request');
var querystring = require('querystring');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); 
var router = express.Router();
var app = express();


var libs = process.cwd() + '/';
var config = require(libs + 'config');
var oauth2 = require(libs + 'auth/oauth2');

var db = require(libs + 'db/mongoose');

var funcReq  = null;
var funcRes = null;

// app.use(cookieParser());
// app.use(expressSession({secret: 'secret',cookie:{maxAge:3600}}));


// Post method for generating the token and storing inside the session
router.post('/', function(req,res,next) {
    //all the form post parameters
    funcReq  = req;
    funcRes = res;
    var grant_type = req.body.grant_type;
    var client_id  = req.body.client_id;
    var client_secret  = req.body.client_secret;
    var userName = req.body.username ;
    var password = req.body.password;    
    
    //Check for the username and password 
    
var form= {     
               grant_type : grant_type,
               client_id : client_id,
               client_secret: client_secret,
               username: userName,
               password : password
                } ;
var formData = querystring.stringify(form);
var contentLength = formData.length;
var domainUri = config.get("domain:uri");
var port = config.get('port');

//post the token on oauth/authorize and get the token against username and password

var oauthUrl =   'http://'+ domainUri +':' + port +'/oauth/authorize';
      console.log(form);
 var  headers= {
     'Connection': 'keep-alive',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Content-Type': 'application/x-www-form-urlencoded'
    };
   var myText ='grant_type=password&client_id=android&client_secret=SomeRandomCharsAndNumbers&username=myapi&password=abc1234';
    request({url:oauthUrl, method: "POST", form:form,headers:headers, body: myText}, function (err, res, body) {      
         
      if (err)
      {
          console.log('Error is : ' + err) 
      }
      else{
          
        var oAuthToken = JSON.parse(body);//.access_token;
         //funcReq.session.oAuthToken = oAuthToken;
        //  Json format is as follows 
        //   var token = resBody.access_token;
        //   var refreshToken = resBody.refresh_token;
        //   var expiresIn = resBody.expires_in;
        //   var tokenType = resBody.token_type;
        //   Store the resBody inside the session 
         //app.use(cookieParser());
        // app.use(expressSession({oAuthToken:oAuthToken, cookie:{maxAge:oAuthToken.expires_in}}));
           
        //get the user information from the users/info route 
        
            var endUri = 'http://'+ domainUri +':' + port +'/users/info';
            var  userHeaders= {
                Authorization : 'Bearer ' + oAuthToken.access_token
                
            };
            request({url:endUri, method: "GET", headers:userHeaders}, function (uErr, res, body) {      
                
            if (uErr)
            {
                console.log('Error is : ' + uErr) 
            }
            else{
                var userInfo = JSON.parse(body);
                console.log(userInfo);
                funcReq.session.user = userInfo;
                //req.session.user = userInfo;
              
                console.log('user Session is : ' + funcReq.session.user.name);
                //console.log(res);
                //funcRes.render('services');
                funcReq.session.cookie.expires = false;      
                funcRes.redirect(301,'http://localhost:1337/services');
                //request.session.userName = userInfo.name;
                //request.session.userId = userInfo.user_Id;                
                //console.log(JSON.parse(body));
                //console.log(req.session.userName);
            }});
          
      }
  });


   
      
    }
);

module.exports = router;