 const express = require('express');
const app = express();
const port =1120;
const path=require('path');

const db=require('./config/mongoose');const userSchema=require('./models/user');

const expressLayouts=require('express-ejs-layouts');
//app.use(expressLayouts);

//we require express-session to play with the session 
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-strategy');

 //to include sass middleware
//const sass=require('node-sass-middleware');

// /***************************/
//to store the session
const MongoStore = require('connect-mongo');
// //const mongoose = require('mongoose');

// /****************************** */



// // To access static files like CSS, JS
app.use(express.static('./assets'));

//to read the submitted data forms
app.use(express.urlencoded({ extended: true }));


 //app.use(cookieParser);
 //-this causes delayed loading

//this is used to store session data
//to create the information about the loging user in an encrypted format

app.use(session({
    secret: 'blahsomething',
    resave: false,
    saveUninitialized: false,
    cookie: {
                maxAge: 100 * 60 * 1000 // 10 minutes in milliseconds
            },
            
       //to store session in mongostore so that it remain accessed for sometime      
        store:MongoStore.create({client:db.getClient(),
            collectionName: 'sessions',
            //tells that session should not expires automatically
        autoRemove: 'disabled',
        })
})
)

 

// // To set view engine to EJS

app.set('view engine', 'ejs');
 app.set('views', './views'); // 'views' instead of 'view'

// // Define a route for the home page




//we initialize the passport so that it can now be used as for authentication
 app.use(passport.initialize());
 //session here is used so that authentication should be preserve for some time i.e session
 //otherwise there created no session and authentication doesn't prevent and we should have to authenticate again
app.use(passport.session());


// /////////////////*KYUN LIKHNA H YE CHECK IT***********//




app.use(passportLocal.setAuthenticatedUser);


 app.use('/',require('./routes/users'))
// app.get('/',function(req,res){
//     return res.render(
//         '_header',{
        
//         }
//     )
//})
 app.listen(port, function () {
  console.log('Server is running on http://localhost:' + port);
 });













