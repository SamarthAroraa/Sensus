const User= require('../models/user');

module.exports.profile= function(req, res){

    return res.render('profile', {
        title: "Profile"
})
}

module.exports.signUp= function(req, res){

    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "Social | Sign Up"
    });
}

module.exports.signIn= function(req, res){

    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Social | Sign In"
    });
}

//get the sign up date

module.exports.create= function(req, res){

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){ 
            
            console.log('Error in finding user in signing up!');
            return}
        
        if(!user){

            User.create(req.body, function(err, user){

                if(err){ 
            
                    console.log('Error in creating user while signing up!');
                    return }

                return res.redirect('/users/sign-in');

            })
        }

        else{
            return res.redirect('back');
        }
    });
}

module.exports.createSession= function(req, res){

    return res.redirect('/');
}

module.exports.destroySession= function(req,res){
    req.logout();

    return res.redirect('/');
}