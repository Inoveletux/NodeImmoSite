let RepoUser = require('../repository/User')
module.exports = class Register {
    print(req, res) {
        res.render('register');  
    }
    processForm(req, res){
        let entity = {
            email : req.body.email || '',
            password : req.body.password || '', // devra être hashé
            civility : req.body.civility || '',
            lastname: req.body.lastname || '',
            firstname: req.body.firstname || '',
            phone: req.body.phone || ''
        };
        (new RepoUser).add(entity);
        
        res.redirect('/');
    // console.log(req.body)
    }
};
