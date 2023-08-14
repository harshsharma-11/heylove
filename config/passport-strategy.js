const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

// // authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email'
},
function (email, password, done) {
    User.findOne({ email: email }).then(function (user) {
        if (!user || user.password !== password) {
            console.log('Invalid username/password');
            return done(null, false);
        }
        return done(null, user);
    }).catch(function (err) {
        console.log('Error in finding the user', err);
        return done(err);
    });
}
));

// serialising the user
//this serialise the information of user that must be put in the session cookie
passport.serializeUser(function(user,done){
done(null,user.id);
})

// //deserialising the user
// passport.deserializeUser(function(id,done){
// User.findById(id,function(err,user){
// if(err){
//     console.log("erro rin finding user");
//     return done(null,false);
// }
// return done(null,user);
// });           **
// });           **
//               **
//             *******
//               ***
// after using    *  then and catch



//deserialize pik id from the session cookie and converting into the user by find  in the database
passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }).catch(function (err) {
        console.log('Error in finding user', err);
        return done(err);
    });
});






/**************check authentication before sending users information to views**********/
//Middle ware
/**********this helps when some one tries /profile without login and here
 *  is checkauthentication middleware which prevent the accessing***** */
passport.checkAuthentication=function(req,res,next){
if(req.isAuthenticated()){
    return next();
}
return res.redirect('/login');
}

 passport.alreadyAuthentication=function(req,res,next){
    
    if(req.isAuthenticated()){
        return res.redirect('/profile')
       
    }
         
    
    return next();
     }


passport.setAuthenticatedUser=(req,res,next)=>{
            if(req.isAuthenticated()){
                /*******we are sending req.user to the views******** */
                res.locals.user=req.user;
                
            }
            next();
            }
module.exports=passport;