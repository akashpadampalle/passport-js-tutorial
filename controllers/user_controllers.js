// getting user model for CRUD operation
const User = require('../models/user');


/**
 * In signup action we create user by getting user details form request
 * firt we extract name, email, password, cpassword (confirm password) from req.body [destructuring]
 * then we check if any field is empty or password and confirm password are not matching then we throw an error according that will break flow
 * and control passed to catch block and this will print error and redirect user to /signup
 * if everything is working well we create user and add to DB and redirect user to /login 
 */
module.exports.signup = async function (req,res){
    try {
        const { name , email, password, cpassword } = req.body;
        
        if(!name || !email || !password){
            console.log(req.body);
            throw new Error('Error: Empty field recieved --> signup');
        }

        if(password != cpassword){  throw new Error('Error: password != confirm password --> signup'); }
        const createdUser = await User.create({name, email, password});
        if(!createdUser){ throw new Error('Error: not able to create an user --> signup'); }
        return res.redirect('/login');

    } catch (error) {
        console.error("Error: ", error);
        return res.redirect('/signup');
    }
}

/**
 * destroySession action is use to logout user by destroying or altering session cookie
 * we get user name from request for create log
 * then use logout function given by passport wich takes callback function to print error
 * if any error accure it prints error to console or if everything work fine it alter the session cookie
 * at the end redirect to homepage (/)
 */
module.exports.destroySession = function (req, res){
    const name = req.user.name;

    req.logout( function(err){
        if(err){ console.log('ERROR: (destroySession)', err); }
        console.log('logout:', name);
    });

    res.redirect('/');
}
