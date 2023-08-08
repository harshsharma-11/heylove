const express=require('express');
const router=express.Router();
const passport=require('../config/passport-strategy');

//const cookieParser = require('cookie-parser');


const usersController=require('../controllers/users_controller');
 router.get('/profile',passport.checkAuthentication,usersController.profile);
////router.use('/contact',require('./contact'));e);
//router.get('/profile', ,usersController.profile);


router.post('/create',usersController.create);
router.get('/home',function(req,res){
    return res.render('home',{
        title:"HOME || CODEIAL"
    })
})

/******************************************manual authentication*********************/
//router.post('/create-session',usersController.createSession);



router.post('/create-session',passport.authenticate('local',
{
    failureRedirect:'/login',
}),usersController.createSession);


//router.post('/create-session', passport.checkAuthentication ,usersController.createSession);

router.get('/signup',passport.alreadyAuthentication,usersController.signup);

router.get('/login',passport.alreadyAuthentication,usersController.login);
router.get('/logout' ,usersController.logout);

router.use('/post',require('./post'));

module.exports=router;