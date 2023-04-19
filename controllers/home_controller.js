

module.exports.home = function(req, res){
    return res.render('home');
}


module.exports.login = function(req, res){
    return res.render('login');
}

module.exports.signup = function(req, res){
    return res.render('signup');
}