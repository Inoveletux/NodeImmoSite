let RepoProduct = require('../repository/Product')

module.exports = class ProductDashboard {
    print(req, res) {
        //if(typeof req.session.user !== 'undefined' ) {

            if(typeof req.params.id !=='undefined') {
                // recuperere les données du biens
                let promise = (new RepoProduct).getByID(req.params.id);
                promise.then((product) => {
                    res.render('admin/dashboard/product.pug', {form : product});
                }, () => {
                    req.flash('error', `Le bien n'a pas été trouvé.`);
                    res.redirect('/admin/product/list');
                });
            } else {
                res.render('admin/dashboard/product.pug', {form: {realty : {}, contact : {}}});
            }
            return;
        //}
        //req.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        //res.redirect('/login');  
    }

    processProductForm(req, res) {
        let entity = {
            realty : {
                realtyName : req.body.realty.seller  || '',
                realtyAddress1 : req.body.realty.address1  || '',
                realtyAdress2 : req.body.realty.address2,
                realtyZipcode : req.body.realty.zipcode  || '',
                realtyCity : req.body.realty.city  || '',
                realtyInfoAddress : req.body.realty.info_address  || '',
                realtyType : req.body.realty.type  || '',
                realtyPrice : req.body.realty.price  || '',
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

    modify(req,res){
        if(typeof req.session.user === 'undefined') {
            req.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            res.redirect('/login');  
        }
        let entity = {
            realty : {
                realtyName : req.body.realty.seller  || '',
                realtyAddress1 : req.body.realty.address1  || '',
                realtyAdress2 : req.body.realty.address2,
                realtyZipcode : req.body.realty.zipcode  || '',
                realtyCity : req.body.realty.city  || '',
                realtyInfoAddress : req.body.realty.info_address  || '',
                realtyType : req.body.realty.type  || '',
                realtyPrice : req.body.realty.price  || '',
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
        };
    
        let promise = (new RepoProduct).modifyById(req.params.id, entity);
        promise.then(() => {
            req.flash('notify', 'Le bien a été modifié')
            res.redirect('/admin/product/list');
        }, () => {
            req.flash('error', 'La modification du bien a échoué')
            res.redirect('/admin/product/list');
        });

    }
};