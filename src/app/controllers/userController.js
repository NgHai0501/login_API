const User = require('../models/user');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');


class UserController{
    // [get] user/login
    login(req,res){
        res.render('user/login')
    }
    // [get] user/signup
    signup(req,res){
        res.render('user/signup')
    }

    // [post] user/store
    store(req,res, next){
        const email = req.body.account;
        const password = req.body.password;
        
        if(!email || !password)
        {
            res.redirect('/user/signup')
        }

        User.findOne({account : email})
            .then(() => res.redirect('/user/signup'))
            .catch(
                bcrypt.hash(password, 10, function(err, hash){
                    if(err) {throw err}
        
                    const newUser = new User({account: email, password: hash})
                    newUser.save()
                        .then(() => res.redirect('/user/login'))
                        .catch(error => {

                        })
                })
            )
    }

    //[post] user/signin
    signin(req,res,next){

        // res.json(req.body)
        const email = req.body.account;
        const password = req.body.password;

        if(!email || !password){
            res.redirect('/user/login')
        }

        User.findOne({account : email}, '+password')
            .then(user => {
                if(!user){
                    res.redirect('/user/login')
                }

                bcrypt.compare(password, user.password)
                    .then(result =>{
                        if(!result){
                            res.redirect('/user/login');
                        }
                        req.session.user = user;
                        res.redirect('/')
                    })
                    .catch(error => {
                        res.redirect('/user/login')
                    })
            }) 
            .catch(error => {
                res.redirect('/user/login')
            })
    }
    // [get] user/logout
    logout(req, res){
        req.session.destroy((err) => {
            if(err){
                console.log(err)
            }
            else res.redirect('/user/login')
        })
    }


}

module.exports = new UserController