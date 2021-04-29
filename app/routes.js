const token = require('../src/services/csrf.js');

module.exports = (app) => {

    // Ajout du middleware gestion des JWT
    require('../src/services/LcAppJwtService.js')(app);

    //Route vers la page d'accueil aka home
    app.get('/', (req, res) => {
        let Home = require('../src/controllers/Home.js');
        (new Home()).print(req, res);
    });
    //Route vers l'inscription aka register
    app.get('/register', token.generate, (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).print(req, res);
    });
    //Post du formulaire de connexion (pour récup ses infos)
    app.post('/register', token.checkToken,  (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).processForm(req, res);
    });
    //Route vers la page de connexion aka login
    app.get('/login', (req, res) => {
        let Login = require('../src/controllers/Login.js');
        (new Login()).print(req, res);
    });
    //Post du formulaire de connexion (pour comparer son contenu à la base)
    app.post('/login', (req, res) => {
        let Login = require('../src/controllers/Login.js');
        (new Login()).processLoginForm(req, res);
    });
    //Route vers la page Admin
    app.get('/admin', (req, res) => {
        let Dashboard = require('../src/controllers/Dashboard.js');
        (new Dashboard()).print(req, res);
    });
    //Route vers la page product
    app.get('/admin/product', token.generate, (req, res) => {
        let Product = require('../src/controllers/ProductDashboard.js');
        (new Product()).print(req, res);
    });
    //Post du formulaire d'ajout de bien
    app.post('/admin/product', token.checkToken, (req, res) => {
        let Product = require('../src/controllers/ProductDashboard.js');
        (new Product()).processProductForm(req, res);
    });
    //Route vers la page listing des biens/produits
    app.get('/admin/product/list', (req, res) => {
        let Product = require('../src/controllers/ProductList.js');
        (new Product()).print(req, res);
    });
    // Route pour la suppression des biens/produits
    app.get('/admin/product/list/delete', (req, res) => {
        let Product = require('../src/controllers/ProductList.js');
        (new Product()).delete(req, res);
    });
    // Route pour la modification d'un produit en fonction de son ID
    app.get('/admin/product/edit/:id', token.generate, (req, res) => {
        //console.log(req.query.id)
        let Product = require('../src/controllers/ProductDashboard.js');
        (new Product()).print(req, res);
    });
    //Route pour envoyer la modification du formulaire de produit (en fonction de l'ID)
    app.post('/admin/product/edit/:id', token.checkToken, (req, res) => {
        //console.log(req.query.id)
        let Product = require('../src/controllers/ProductDashboard.js');
        (new Product()).modify(req, res);
    });
};
