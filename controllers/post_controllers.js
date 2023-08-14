const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create= async function(req,res){

try{
const post=await Post.create({
       content:req.body.content,
        user:req.user._id,
             },)
             console.log(req.user._id);
res.locals.post=post;

     return res.redirect('/profile');
}
catch(err){
    console.log('error in creating the post',err)
}
}


module.exports.deletePost=async function(req,res){
    try{
const post=await Post.findById(req.body.params);
//instead of ._id here we use .id to convert the id into string so that we can compare easily
if(post.user==req.user.id){

    

    Comment.deleteMany({post:req.params.id})
return res.redirect('back');
}
else{
    return res.redirect('back');
}

    }
    catch(err){
console.log("error in deleting");
    }
}


module.exports.createComment = async function(req, res) {
    try {
        const post = await Post.findById(req.body.post_id);
    //     console.log(req.body.post_id);
    // console.log(post);
    //return res.redirect('/home');
    if (post) {
        const newComment = await Comment.create({
            content: req.body.comment,
            post: post,
            user: req.user._id
        });
console.log(newComment);
        post.comments.push(newComment._id);
        // so taht changes made to the post will store in db 
        await post.save();

        return res.redirect('/home');
    } else {
        throw new Error('Post not found');
    }
     
    } catch (err) {
        console.error('Error in creating comment:', err);
        // Handle errors, e.g., render an error page or redirect with an error message
        return res.redirect('/error'); // Example of redirecting to an error page
    }
};




