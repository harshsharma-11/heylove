const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    content:{
type:String,
required:true,
    },
    user:{
type:mongoose.Types.ObjectId,
//type:String,
required:true,
    }
},{
    timestamps:true,
}
)
const post=mongoose.model('Post',postSchema);
module.exports=post;