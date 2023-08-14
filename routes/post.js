const express=require('express');
const router=express.Router();
const passport=require('../config/passport-strategy')

const postControllers=require('../controllers/post_controllers');
router.post('/create-post',passport.checkAuthentication,postControllers.create);
router.post('/comment',postControllers.createComment);
router.get('/deletePost/:id',postControllers.deletePost);

router.get('/deleteComment/:id',postControllers.deleteComment);
// router.post('/delete/:id',postControllers.deletePost);
//router is exported because if we didn't export it then other routes can't access what this route do
//let e.g is users.js use post routers do it need to export to make it possible for them
module.exports=router;