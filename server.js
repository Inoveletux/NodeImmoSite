const express = require('express');
const app = express();
const path = require('path');
const config = require('./app/config');
let bodyParser = require('body-parser')

//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');
 
//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
 
//--------------------------------------------------------------------
//     Utilisation du body parser
//--------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: false }))

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

