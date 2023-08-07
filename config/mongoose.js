

const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/codeial_development');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error in connecting'));
db.once('open',function(){
    console.log("succesfully connected to database");
});
module.exports=db;