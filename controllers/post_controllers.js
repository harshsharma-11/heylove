const Post=require('../models/post');

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


const Comment=require('../models/comment');
// module.exports.createComment= async function(req,res){
    
//     Post.findById(req.body.post, function(err,post){
//         if(post){
//             Comment.create({
//                 content:req.body.comment,
//                 post:req.post_id,
//                 user:req.user._id,
//             },
//             function(err,comment){
//                 post.comments.push(comment);
//                 post.save();
//                 res.redirect('/home');
//             }
//             );
//         }
//     });
// }

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




