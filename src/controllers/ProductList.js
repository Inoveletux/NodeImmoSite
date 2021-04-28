let RepoProduct = require('../repository/Product')

module.exports = class Dashboard {
    print(req, res) {
        // if(typeof req.session.user === 'undefined') {
        //     req.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        //     res.redirect('/login');  
        // }

        (new RepoProduct).getAll().then((products) => {
            // console.log(products)
            res.render('admin/dashboard/list/listProduct', {
                products
            });
        });
    }

    delete(req,res) {
        // if(typeof req.session.user === 'undefined') {
        //     req.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        //     res.redirect('/login');  
        // }

        (new RepoProduct).deleteByID(req.query.id).then(() => {
            req.flash('notify', 'Le bien a été supprimé')
            res.redirect('/admin/product/list');
        }, () => {
            req.flash('error', 'La suppression du bien a échoué')
            res.redirect('/admin/product/list');
        });
    }
};