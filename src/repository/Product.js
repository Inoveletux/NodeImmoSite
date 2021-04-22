//faire le lien avec la base de donnée.
require('../../app/database.js');

const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    realty : {
        realtyName : {  type: String },
        realtyAddress1 : { type: String },
        realtyAdress2 : {  type: String },
        realtyZipcode : {  type: String },
        realtyCity : { type: String },
        realtyInfoAddress : { type: String },
        realtyType : { type: String },
        realtyPrice : { type: String },
        realtyAmountComission : { type: String },
        realtyPercentageComission : { type: String },
        realtyArea : { type: String },
        realtyRoom : { type: String },
        realtyTypeProduct : { type: String },
        realtyInfoRealty : { type: String },
    }, 
    contact : {
        contactCivility :  { type: String },
        contactLastName :  { type: String },
        contactFirstName :  { type: String },
        contactEmail :  { type: String },
        contactMobile :  { type: String },
        contactPhone :  { type: String },
        contactInfo : { type: String },
    }
}, { versionKey: false });
 
module.exports = class Product {
    constructor() {
        this.db = mongoose.model('Product', ProductSchema); 
    }
    add(entity) {
        return new Promise((res, rej)=> {
            console.log(entity)
            this.db.create(entity, function (err, user){
                // console.log(err)
                if(err) rej (err);
                res(user)
            });
        })
    }

    getAll() {        
        return new Promise((res, rej)=> {
            this.db.find({}, function (err, products){
                // console.log(err, products)
                if(err) rej (err);
                res(products)
            });
        })
    }

    getByID(id) {
        return new Promise((res, rej)=> {
            this.db.findOne({_id: id}, function (err, product){
                if(err || product === null) rej();
                res(product);
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
