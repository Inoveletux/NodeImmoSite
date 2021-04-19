let bcrypt = require('bcryptjs');
let RepoUser = require('../repository/User')
module.exports = class Login {
    print(req, res) {
        res.render('login');  
    }
    processLoginForm(req, res){
        let entity = {
            email : req.body.email || '', 
            password : req.body.password || ''
        }
        let vaMeChercherLEmail = (new RepoUser).userGetEmail(entity.email);
        // vaMeChercherLEmail.then(console.log)
        vaMeChercherLEmail.then((user) => {
            // const bcrypt = require('bcrypt');
            if(bcrypt.compareSync(entity.password, user.password)){
                req.session.user = user;
                req.flash('notify', "Vous êtes bien connecté");
                res.redirect('/')
            }else {
                req.flash('error', "L'identification à échouée");
                res.redirect('/login')
            }
            console.log(user);
    // Comparer le password (bcrypt.compare)
        },(err) => {
            req.flash('error', "L'identification à échouée");
            res.redirect('/login') //flashbag+redirection page login
        })
    }
};