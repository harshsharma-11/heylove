const mongoose =require('mongoose');
mongoose.connnect('mongodb://localhost/codeial_development');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error in connecting to mongodb'));
db.once('open',function(){
    console.log('connected to database');

})

module.exports('./config/mongoose');