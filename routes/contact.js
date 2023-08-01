const express=require('express');
const router=express.Router();
const contactController=require('../controllers/contact_controller');
router.get('/',contactController.contact);
console.log("router is loaded");
module.exports=router;