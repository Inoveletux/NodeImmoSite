module.exports = (app) => {
    //Route vers la page d'accueil aka home
    app.get('/', (req, res) => {
        let Home = require('../src/controllers/Home.js');
        (new Home()).print(req, res);
    });
    //Route vers l'inscription aka register
    app.get('/register', (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).print(req, res);
    });
    //Post du formulaire de connexion (pour récup ses infos)
    app.post('/register', (req, res) => {
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
    app.get('/admin/product', (req, res) => {
        let Product = require('../src/controllers/ProductDashboard.js');
        (new Product()).print(req, res);
    });
    //Post du formulaire d'ajout de bien
    app.post('/admin/product', (req, res) => {
        let Product = require('../src/controllers/ProductDashboard.js');
        (new Product()).processProductForm(req, res);
    });
};
