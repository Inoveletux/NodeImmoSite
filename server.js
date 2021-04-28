const express = require('express');
const app = express();
const path = require('path');
const config = require('./app/config');
let bodyParser = require('body-parser');

//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');
//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
const session = require('express-session');
app.use(session({
    secret: config.appKey, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));
//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
const flash = require('express-flash-messages');
app.use(flash());

//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

//--------------------------------------------------------------------
//     Utilisation du body parser
//--------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }))

//--------------------------------------------------------------------
//      Session (AVANT CES ROUTES.)
//--------------------------------------------------------------------
// app.use((req,res,next) => {
// app.use((req,res,next) => {
//     req.session.user = {
//         _id: '6079659ec4a3352e64605b04',
//         email: 'foiehjfoei@gmail.com',
//         password: '$2a$10$LQlc6KMf3Xy3dC3nWwWJKe7eYwcJYoo9Wiq/xHspD/QGm2srhG9du',
//         civility: '1',
//         lastname: 'pzodjpzjo',
//         firstname: 'pezoljfpoefj',
//         phone: '0146765434',
//         date: '2021-04-16T10:23:26.419Z'
//     };
//     next();
// });
//--------------------------------------------------------------------
//       permet d'envoyer des variables à toutes les vues
//-------------------------------------------------------------------- 
app.use((req,res,next) => {
    //res.locals.session = req.session;
    res.locals.user = {}
    res.locals.websiteName = config.websiteName; 
    res.locals.route = req._parsedUrl.pathname;
    next();
});

//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./app/routes')(app);



//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(config.port,() => {
    console.log(`Le serveur est démarré : http://localhost:${config.port}`);
    if (process.send) {
        process.send('online');
    }
});


