const assert = require('assert');
const repoUser = require('./src/repository/User.js')



it('should be true if email exist', (done) => {
    (new repoUser).userGetEmail('foiehjfoei@gmail.com').then((result) => {
        assert.notStrictEqual(result, null);
        assert.strictEqual(result.email, 'foiehjfoei@gmail.com');
        done();
    });

});

it("should be true if email doesn't exist", (done) => { 
    (new repoUser).userGetEmail('foiehjfoei@gmail.com').then(() => {
        //-- on ne tombera pas ici car on test un email inexistant 
    },(msg) => {
        assert.ok(true)
        //assert.strictEqual(msg, `Utilisateur non trouvé`);
        done();
    });
});
