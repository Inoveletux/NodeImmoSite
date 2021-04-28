module.exports = (app) => {

    // Ajout du middleware gestion des JWT
    require('../src/services/LcAppJwtService.js')(app);

    //Route vers la page d'accueil aka home
    app.get('/', (req, res) => {
        let Home = require('../src/controllers/Home.js');
        (new Home()).print(req, res);
    });
    //Route vers la page d'un produit en fonctin de son ID
    app.get('/product/:id', (req, res) => {
        //console.log(req.params.id)
        let Product = require('../src/controllers/ProductClicked.js');
        (new Product()).print(req, res);
    });
    //Route vers l'inscription => register
    app.get('/register', (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).print(req, res);
    });
    //Post du formulaire de connexion (pour récupérer ses infos)
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
    app.get('/admin/product/edit/:id', (req, res) => {
        //console.log(req.query.id)
        let Product = require('../src/controllers/ProductDashboard.js');
        (new Product()).print(req, res);
    });
    //Route pour envoyer la modification du formulaire de produit (en fonction de l'ID)
    app.post('/admin/product/edit/:id', (req, res) => {
        //console.log(req.query.id)
        let Product = require('../src/controllers/ProductDashboard.js');
        (new Product()).modify(req, res);
    });
    // Exporté vers "services"
    // app.get('/admin/test-jwt', (req, res) => { 
    //     const jwt = require('jsonwebtoken');
    //     const Cookies = require( "cookies" );
    //     const config = require('./config.js')
    //     // Récupération du token dans le cookie
    //     let token = new Cookies(req,res).get('access_token');
    //     // Si le cookie (access_token) n'existe pas
    //     if (token == null) return res.sendStatus(401);
    //     // sinon on vérifie le jwt
    //     jwt.verify(token, config.appKey, (err, dataJwt) => { 
    //         // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
    //         if(err) return res.sendStatus(403);
    //         // A partir de là le JWT est valide on a plus qu'à vérifier les droits
    //         // Si on est admin
    //         if(typeof dataJwt.roles != 'undefined' && dataJwt.roles == 'admin') {
    //             return res.send(`Admin ${dataJwt.username}`);
    //         } 
    //         else {
    //             // si on n'est pas admin
    //             return res.send(`${dataJwt.firstname} PAS ADMIN !!!!`);
    //         }
    //     });
    // });
    

};
