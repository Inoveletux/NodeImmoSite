let RepoUser = require('../repository/User')

module.exports = class Contact {
    print(req, res) {
        // if(typeof req.session.user === 'undefined') {
        //     req.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        //     res.redirect('/login');  
        // }

        (new RepoUser).getAllContacts().then((users) => {
            // console.log(products)
            res.render('admin/dashboard/list/listContact.pug', {
                users
            });
        });
    }

    delete(req,res) {
        (new RepoUser).deleteByID(req.query.id).then(() => {
            req.flash('notify', 'Le contact a été supprimé')
            res.redirect('/admin/contact');
        }, () => {
            req.flash('error', 'La suppression du contact a échoué')
            res.redirect('/admin/contact');
        });
    }
};