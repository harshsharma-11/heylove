const express=require('express');
const router=express.Router();
const passport=require('../config/passport-strategy');
const post=require('../models/post');

//const cookieParser = require('cookie-parser');


const usersController=require('../controllers/users_controller');
 router.get('/profile',passport.checkAuthentication,usersController.profile);
////router.use('/contact',require('./contact'));e);
//router.get('/profile', ,usersController.profile);


router.post('/create',usersController.create);


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

router.get('/home',async function (req, res) {
    try {
      
      
      const feeds = await post.find({}).populate('user')
      .populate({
        path:'comments',
        populate:{
          path:'user'

        }
      });
       

      
      return res.render('home', {
        title: "HOME",
        post_lists: feeds,
      });
    } catch (err) {
      console.log('Error in fetching contacts from the database:', err);
      return res.status(500).send('Internal Server Error');
    }
  })
module.exports=router;