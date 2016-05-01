var codeTableHelper = require('../data/codeTableHelper');

module.exports = function (app, passport) {
    
    app.post('/api/getCountries', function (req, res, next) {
        codeTableHelper.getCountriesList(req, res, next);
    });
    
    app.post('/api/getStatesById', function (req, res, next) {
        codeTableHelper.getStatesList(req, res, next);
    });
    
    app.post('/api/getCitiesById', function (req, res, next) {
        codeTableHelper.getCitiesList(req, res, next);
    });

     // --- End --
}


