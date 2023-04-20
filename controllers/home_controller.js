
// action for render home.ejs
module.exports.home = function(req, res){
    return res.render('home');
}

// action for render login.ejs
module.exports.login = function(req, res){
    return res.render('login');
}

// action for rendering signup.ejs
module.exports.signup = function(req, res){
    return res.render('signup');
}

// action for rendering restricted.ejs
module.exports.restricted = function(req, res){
    return res.render('restricted');
}