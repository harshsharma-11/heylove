const User=require('../models/user');
const passport=require('passport');

//////render signup page
/**************kyunki authenticated tb hi ayega jb yo login hoga matlab sinup to hua hoga guranteed** */
module.exports.signup=function(req,res){
  
    return res.render('signup',{
        title:"CODIAL | SIGNUP",
    })
}

//////render login page
module.exports.login=function(req,res){
   // console.log(req.cookies);
   console.log("hello");
    
    return res.render('login',{
        title:"CODIAL | LOGIN",
    })
}


///logout
module.exports.logout= function(req,res)
{req.logout(function(err) {
  if (err) {
    console.error("Error logging out:", err);
    return res.status(500).send("Error logging out");
  }

  // Redirect the user to the login page after successful logout
  return res.redirect('/login');
});
}


// Render profile page


  module.exports.profile = function(req, res) {
    
    
        // User is authenticated, render profile page
        return res.render('profile', {
        
            name: req.user.name,
                  email: req.user.email,
                  password: req.user.password,
                  Username: req.user.name,
                  title: "CODIAL | PROFILE",

    });




  }







module.exports.create = async function(req, res) {
  try {
    console.log("password is", req.body);

    // Check if the passwords match
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect('back');
    }

    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // If the user does not exist, create a new user
      const newUser = await User.create(req.body);
      return res.redirect('/login');
    } else {
      // If the user exists, redirect back
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error in finding/creating user:', err);
    // Handle the error appropriately
    return res.status(500).send('Internal Server Error');
  }

}


//////////////get the login data
module.exports.createSession=function(req, res) {

  console.log('hi');

  
return res.redirect('/profile');


  }