const User = require('../models/user');

module.exports.signup = async function (req,res){
    try {
        const { name , email, password, cpassword } = req.body;
        
        //check if any field is empty
        if(!name || !email || !password){
            console.log(req.body);
            throw new Error('Error: Empty field recieved --> signup');
        }

        // check password and confirm password are the same
        if(password != cpassword){
            throw new Error('Error: password != confirm password --> signup');
        }

        const createdUser = await User.create({name, email, password});

        // checking user is created successfully or not
        if(!createdUser){
            throw new Error('Error: not able to create an user --> signup');
        }

        return res.redirect('/login');

    } catch (error) {
        console.error("Error: ", error);
        return res.redirect('/signup');
    }
}


module.exports.destroySession = function (req, res){
    const name = req.user.name;
    req.logout( function(err){
        if(err){
            console.log('ERROR: (destroySession)', err);
        }
        console.log('logout:',name) ;
    });
    res.redirect('/');
}
