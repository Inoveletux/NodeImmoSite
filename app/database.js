//--------------------------------------------------------------------
//     Connexion à mongoose
//--------------------------------------------------------------------
const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://userdb:Iweifu91@cluster0.g8puv.mongodb.net/myFirstDatabase', 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.once('open', () => {
   console.log(`connexion OK !`);
});