let RepoProduct = require('../repository/Product')

module.exports = class ProductDashboard {
    print(req, res) {
        if(typeof req.params.id !=='undefined') {
            // recuperere les données du biens
            let promise = (new RepoProduct).getByID(req.params.id);
            promise.then((product) => {
                res.render('productID.pug', {product});
            }, () => {
                req.flash('error', `Le bien n'a pas été trouvé.`);
                res.redirect('/home.pug');
            });
        }
        return;
    }
}