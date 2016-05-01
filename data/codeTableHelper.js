var sqlHelper = require('../config/database');

exports.countries = sqlHelper.db.define('countries', {
    id: { type: 'text', key: true }, 
    sortname: { type: 'text' },
    name: { type: 'text' },
});

exports.states = sqlHelper.db.define('states', {
    id: { type: 'text', key: true }, 
    name: { type: 'text' },
    country_id: { type: 'text' },
});

exports.cities = sqlHelper.db.define('cities', {
    id: { type: 'text', key: true }, 
    name: { type: 'text' },
    state_id: { type: 'text' },
});

exports.getCountriesList = function (req, res, next) {
    try {
        sqlHelper.executeOrmKendoFilterQuery(this.countries, req.body, function (err, countries) {
            if (err) {
                res.writeHead(500, err);
            }
            else {
                res.send({ "data": countries, "total": countries.length });
                res.end();
            }
        });
    } catch (e) {
        res.writeHead(500, "Error");
    }
};

exports.getStatesList = function (req, res, next) {
    try {
        var conditionArray = { country_id: req.body.country_id };
        sqlHelper.executeParamOrmKendoFilterQuery(this.states, conditionArray, req.body, function (err, states) {
            if (err) {
                res.writeHead(500, err);
            }
            else {
                res.send({ "data": states, "total": states.length });
                res.end();
            }
        });
    } catch (e) {
        res.writeHead(500, "Error");
    }
};

exports.getCitiesList = function (req, res, next) {
    try {
        var conditionArray = { state_id: req.body.state_id };
        sqlHelper.executeParamOrmKendoFilterQuery(this.cities, conditionArray, req.body, function (err, cities) {
            if (err) {
                res.writeHead(500, err);
            }
            else {
                res.send({ "data": cities, "total": cities.length });
                res.end();
            }
        });
    } catch (e) {
        res.writeHead(500, "Error");
    }
};
