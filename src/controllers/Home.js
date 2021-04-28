let RepoProduct = require('../repository/Product')

module.exports = class Home {
    print(req, res) {
        (new RepoProduct).getAll().then((products) => {
            // console.log(products)
            res.render('home',{
                products
            }); 
            
        }); 
    }
};
