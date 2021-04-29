/*
module.exports = () => { 

    function generate(req, res, next){
        let token = require('crypto').createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex').toLowerCase();
        //Mettre le token dans la session, utilisable par le template 
        // req.session.token = token;
        next();
    }
};
*/

exports.generate = function(req, res, next) {
    let token = require('crypto').createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex').toLowerCase();
    //Mettre le token dans la session, utilisable par le template  
    req.session.token = token;
    res.locals.token = token;
    next();
};

exports.checkToken = function(req, res, next) {
    if(req.session.token == req.body.csrf) {

        next();
    } else {
        res.status(403).send('Accès non autorisé')
    }
};
