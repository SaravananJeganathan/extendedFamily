var sqlHelper = require('../config/database');
var bcrypt = require('bcrypt-nodejs');

// exports.donorusers = sqlHelper.db.define('donorusers', {
//     userId: { type: 'text', key: true }, 
//     firstName: { type: 'text' },
//     lastName: { type: 'text' },
//     email: { type: 'text' },
//     phoneNumber: { type: 'text' },
//     country: { type: 'text' },
//     state: { type: 'text' },
//     city: { type: 'text' },
//     zip: { type: 'text' },
//     designation: { type: 'text' },
//     badge: { type: 'text' },
//     password: { type: 'text' },
//     resetPass: { type: 'text' },
//     enabled: { type: 'boolean' },
//     dateUpdated: { type: 'date' },
//     updatedBy: { type: 'text' },
//     createdDate: { type: 'date' },
//     createdBy: { type: 'text' },
// });

// exports.beneficiaryUsers = sqlHelper.db.define('beneficiaryUsers', {
//     userId: { type: 'text', key: true }, 
//     firstName: { type: 'text' },
//     lastName: { type: 'text' },
//     email: { type: 'text' },
//     phoneNumber: { type: 'text' },
//     country: { type: 'text' },
//     state: { type: 'text' },
//     city: { type: 'text' },
//     zip: { type: 'text' },
//     designation: { type: 'text' },
//     badge: { type: 'text' },
//     password: { type: 'text' },
//     resetPass: { type: 'text' },
//     enabled: { type: 'boolean' },
//     dateUpdated: { type: 'date' },
//     updatedBy: { type: 'text' },
//     createdDate: { type: 'date' },
//     createdBy: { type: 'text' },
// });


// exports.addNewDonor = function (req, res, next) {
//     req.body.password = bcrypt.hashSync(req.body.password);
//     var paramArray = {
//         userId: req.body.userId,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName, 
//         email: req.body.email, 
//         phoneNumber: req.body.phoneNumber,
//         country: req.body.country,
//         state: req.body.state,
//         city: req.body.city,
//         zip: req.body.zip,
//         designation: req.body.designation,
//         badge: req.body.badge,
//         password: req.body.password,
//         enabled: req.body.enabled,
//         CreatedDate: new Date(),
//         CreatedBy: req._passport.session.user, 
//         DateUpdated: new Date(),        
//         UpdatedBy: req._passport.session.user,
//     };
//     sqlHelper.executeOrmInsertQuery(this.donorusers , paramArray, function (err, donorusers) {
//         if (err) {
//             res.writeHead(500, err);
//         }
//         else {
//             res.send({ "data": donorusers, "total": donorusers.length });
//             res.end();
//         }
//     });
// };

// exports.addNewBeneficiary=function (req, res, next) {
//   req.body.password = bcrypt.hashSync(req.body.password);
//     var paramArray = {
//         userId: req.body.userId,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName, 
//         email: req.body.email, 
//         phoneNumber: req.body.phoneNumber,
//         country: req.body.country,
//         state: req.body.state,
//         city: req.body.city,
//         zip: req.body.zip,
//         designation: req.body.designation,
//         badge: req.body.badge,
//         password: req.body.password,
//         enabled: req.body.enabled,
//         CreatedDate: new Date(),
//         CreatedBy: req._passport.session.user, 
//         DateUpdated: new Date(),        
//         UpdatedBy: req._passport.session.user,
//     };
    
//     sqlHelper.executeOrmInsertQuery(this.beneficiaryUsers , paramArray, function (err, beneficiaryUsers) {
//         if (err) {
//             res.writeHead(500, err);
//         }
//         else {
//             res.send({ "data": beneficiaryUsers, "total": beneficiaryUsers.length });
//             res.end();
//         }
//     }); 
// };

exports.users = sqlHelper.db.define('users', {
    userId: { type: 'text', key: true }, 
    firstName: { type: 'text' },
    lastName: { type: 'text' },
    email: { type: 'text' },
    phoneNumber: { type: 'text' },
    country: { type: 'text' },
    state: { type: 'text' },
    city: { type: 'text' },
    zip: { type: 'text' },
    designation: { type: 'text' },
    badge: { type: 'text' },
    password: { type: 'text' },
    resetPass: { type: 'text' },
    enabled: { type: 'boolean' },
    dateUpdated: { type: 'date' },
    updatedBy: { type: 'text' },
    createdDate: { type: 'date' },
    createdBy: { type: 'text' },
});

exports.addNewUser=function (req, res, next) {
  req.body.password = bcrypt.hashSync(req.body.password);
    var paramArray = {
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        email: req.body.email, 
        phoneNumber: req.body.phoneNumber,
        country: req.body.country.id,
        state: req.body.state.id,
        city: req.body.city.id,
        zip: req.body.zip,
        designation: req.body.designation,
        badge: req.body.badge,
        password: req.body.password,
        enabled: req.body.enabled,
        CreatedDate: new Date(),
        CreatedBy: req._passport.session.user, 
        DateUpdated: new Date(),        
        UpdatedBy: req._passport.session.user,
    };
    
    sqlHelper.executeOrmInsertQuery(this.users , paramArray, function (err, users) {
        if (err) {
            res.writeHead(500, err);
        }
        else {
            res.send({ "data": users, "total": users.length });
            res.end();
        }
    }); 
};