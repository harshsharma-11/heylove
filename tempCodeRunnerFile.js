const express = require('express');
const app = express();
const port = 8000;
const path=require('path');


 const cookieParser=require('cookie-parser');
 //app.use(cookieParser);

// To get the functionality of MongoDB, we include mongoose
const db = require('./config/mongoose');

// To access static files like CSS, JS
app.use(express.static('./assets'));


app.use(express.urlencoded());
 

// To set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views'); // 'views' instead of 'view'

// Define a route for the home page
app.use('/',require('./routes/users'));
// Start the server
app.listen(port, function () {
  console.log('Server is running on http://localhost:' + port);
});