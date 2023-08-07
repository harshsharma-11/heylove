const express=require('express');
const router =express.Router();

 const homeController=require('../controllers/users_controller');
 
 
 
 router.use('/users',require('./users'));
 console.log("router is loaded");

module.exports=router;