var bcrypt = require('bcryptjs');
let RepoUser = require('../repository/User')

module.exports = class Contact {
    print(req, res) {
        res.render('admin/dashboard/add/addContactForm.pug');  
    }

    processForm(req, res){
        let entity = {
            email : req.body.email || '',
            password : req.body.password || '', 
            civility : req.body.civility || '',
            lastname: req.body.lastname || '',
            firstname: req.body.firstname || '',
            phone: req.body.phone || '',
            roles: req.body.roles || ''
        };
        var salt = bcrypt.genSaltSync(10);
        entity.password = bcrypt.hashSync(req.body.password, salt);
        // console.log(entity)
        console.log(req.body)

        //
        let promise = (new RepoUser).add(entity);
        promise.then(() => {

            if(req.body.email === '' || req.body.password === '' || req.body.civility === '' || req.body.lastname === '' || req.body.firstname === '' || req.body.phone === ''){
                req.flash('error', "L'enregistrement à échoué");
                res.redirect('/admin/contact/add')
            } else {
                req.flash('notify', 'Votre compte a bien été créé.');
                res.redirect('/admin/contact');
            };
        });
    };
};