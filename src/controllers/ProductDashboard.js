let RepoProduct = require('../repository/Product')


module.exports = class ProductDashboard {
    print(req, res) {
        if(typeof req.session.user !== 'undefined') {
            res.render('admin/dashboard/product.pug');
            return;
        }
        req.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        res.redirect('/login');  
    }

    processProductForm(req, res) {
        console.log(req.body)
        let entity = {
            realty : {
                realtyName : req.body.realty.seller  || '',
                realtyAddress1 : req.body.realty.address1  || '',
                realtyAdress2 : req.body.realty.adress2,
                realtyZipcode : req.body.realty.zipcode  || '',
                realtyCity : req.body.realty.city  || '',
                realtyInfoAddress : req.body.realty.info_adress  || '',
                realtyType : req.body.realty.type  || '',
                realtyPrice : req.body.realty.realty  || '',
                realtyAmountComission : req.body.realty.amount_comission  || '',
                realtyPercentageComission : req.body.realty.percentage_comission  || '',
                realtyArea : req.body.realty.area  || '',
                realtyRoom : req.body.realty.room  || '',
                realtyTypeProduct : req.body.realty.type_product  || '',
                realtyInfoRealty : req.body.realty.info_realty,
            },
            contact : {
                contactCivility : req.body.contact.civility || '',
                contactLastName : req.body.contact.lastname || '',
                contactFirstName : req.body.contact.firstname || '',
                contactEmail : req.body.contact.email || '',
                contactMobile : req.body.contact.mobile || '',
                contactPhone : req.body.contact.phone || '',
                contactInfo : req.body.contact.info
            }
            // photos : req.body.??
        }
        let promise = (new RepoProduct).add(entity);
        promise.then(() => {
            if(req.body.realtyName === '' ){
                req.flash('error', "L'enregistrement à échoué");
                res.redirect('/admin/product')
            } else {
                req.flash('notify', 'Votre compte a bien été créé.');
                res.redirect('/admin/product');
            }
        });
    }
};