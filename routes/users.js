const express=require('express');
const router=express.Router();
const passport=require('../config/passport-strategy');
const post=require('../models/post');
const User=require('../models/user');

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
    
      //user here is the field user of Post model
      //with .populate user now user contains the data instead of containg the object id but now data of thatid
      const feeds = await post.find({}).populate('user')
      
      .populate({
        //commments are fileld of Post model
        path:'comments',
        populate:{
          //user here is field user of Comment model
          path:'user',
        }
      });
      
      const users=await User.find({});
       

      
      return res.render('home', {
        title: "HOME",
        post_lists: feeds,
        friends_list:users,
      });
    } catch (err) {
      console.log('Error in fetching contacts from the database:', err);
      return res.status(500).send('Internal Server Error');
    }
  })
module.exports=router;