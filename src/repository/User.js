//faire le lien avec la base de donnée.
require('../../app/database.js');

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email : {  type: String },
    password : { type: String },
    civility : {type: String, match: /^[1-2]{1}$/},
    lastname: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    firstname: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    phone: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
    date: { type: Date, default: Date.now },
    roles: { type: String }
}, { versionKey: false });
 
module.exports = class User {
    constructor() {
        this.db = mongoose.model('User', UserSchema); 
    }
 
    add(userEntity) {
        // console.log(userEntity)
        return new Promise((res, rej)=> {
            this.db.create(userEntity, function (err, user){
                if(err) rej (err);
                res(user)
            });
        })
    }
    userGetEmail(email) {
        return new Promise((res, rej) => {
            this.db.findOne({ email }, (err, user) => {
                // si pas d'erreur, email trouvé
                if (!err && user !== null) {
                    res(user);
                }  
                //res(false);
                // ou 
                rej(`Utilisateur non trouvé`);
            })
        })
    }

    getAllContacts() {        
        return new Promise((res, rej)=> {
            this.db.find({}, function (err, user){
                // console.log(err, products)
                if(err) rej (err);
                res(user)
            });
        })
    }
    modifyById(id, entity) {
        return new Promise((res, rej)=> {
            this.db.updateOne({_id : id}, entity, function (err){
                // console.log(err, products)
                if(err) rej (err);
                res();
            });
        });
    }

    deleteByID(id) {
        return new Promise((res, rej)=> {
            this.db.deleteOne({_id: id}, function (err){
                if(err) rej (err);
                res();
            });
        });
    }
} 
