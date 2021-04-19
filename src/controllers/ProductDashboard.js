module.exports = class Dashboard {
    print(request, response) {
        if(typeof request.session.user !== 'undefined') {
            response.render('admin/dashboard/product.pug');
            return;
        }
        request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        response.redirect('/login');  
    }
};