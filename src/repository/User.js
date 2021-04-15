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
    date: { type: Date, default: Date.now }
}, { versionKey: false });
 
module.exports = class User {
    constructor() {
        this.db = mongoose.model('User', UserSchema); 
    }
 
    add(userEntity) {
        // console.log(userEntity)
        return new Promise((resolve, reject)=> {
            this.db.create(userEntity, function (err, user){
                if(err) reject (err);
                resolve(user)
            });
        })
    }
} 
