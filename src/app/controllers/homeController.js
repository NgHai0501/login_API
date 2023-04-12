

class HomeController{
    show(req,res){
        if(req.session.user){
            res.locals.currentUser = req.session.user
            res.render('home1')
        }
        else{
            res.redirect('/user/login')
        }
    }
    
}

module.exports = new HomeController