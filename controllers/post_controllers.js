const Post=require('../models/post');
module.exports.create= async function(req,res){
    // post.create({
    //     content:req.body.content,
    //     user:req.user._id,
    // },
    // function(err,post){
    //     if(err){
    //         console.log('error in creating the post');
    //     }
    //     return res.resdirect(back);
    // })
try{
const post=await Post.create({
       content:req.body.content,
        user:req.user._id,
             },)
             console.log(req.user._id);

     return res.redirect('/profile');
}
catch(err){
    console.log('error in creating the post',err)
}
}