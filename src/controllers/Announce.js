let RepoProduct = require ('../repository/Product.js')

module.exports = class Home {
    print(req, res) {
        // on est en modification
        if(typeof req.params.id !== 'undefined') {
            let repo = new RepoProduct();
            repo.getByID(req.params.id).then((product) => {
                console.log(product)
                res.render('announce/index', {product});
            }, () => {
                req.flash('error',`Le bien n'a pas été trouvé.`)
                res.redirect('/');
            });   
        } else {
            req.flash('error',`Le bien n'a pas été trouvé.`)
            res.redirect('/');
        }
    }
};