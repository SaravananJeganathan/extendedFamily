var usersHelper = require('../data/usersHelper');

module.exports = function (app) {


    // app.post('/api/saveDonor', function (req, res) {
    //     usersHelper.addNewDonor(req, res);
    // });
    
    // app.post('/api/saveBeneficiary', function (req, res) {
    //     usersHelper.addNewBeneficiary(req, res);
    // });
    
    app.post('/api/saveUser', function (req, res) {
        usersHelper.addNewUser(req, res);
    });
    
     // --- End --





};

