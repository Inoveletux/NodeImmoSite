module.exports = class Dashboard {
    print(req, res) {
        res.render('admin/dashboard/index');
    //     if(typeof req.session.user !== 'undefined') {
    //         res.render('admin/dashboard/index');
    //         return;
    //     }
    //     req.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
    //     res.redirect('/login');  
    }
};