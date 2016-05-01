var mysql = require('mysql');
var orm = require('orm');


var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    port            : '3306',
    user            : 'root',
    password        : '123456'
});

exports.db = orm.connect({
    host: 'localhost',
    port: '3306',
    database: 'extfamily',
    user: 'root',
    password: '123456',
    protocol: 'mysql',
    query: { pool: true, debug: true },

});



exports.getConnection = function (callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        callback(err, conn);
    });
};

exports.returnConnection = function (connection) {
    connection.release();
};

exports.executeQuery = function (sql, paramArray, callback) {
    pool.getConnection(function (err, connection) {
        try {
            connection.query(sql, paramArray, function (err, data) {
                connection.release();
                callback(null, data);
            });
        }
        catch (e) {
            connection.release();
            callback(e, null);
        }
    });
};

exports.executeOrmKendoFilterQuery = function (model, kParams, callback) {
    var params = convertKendoParams(kParams);
    model.find(params.filter, params.limit, params.offset, function (err, results) {
        callback(err, results);
    });
};

exports.executeOrmUpdateQuery = function (model, conditionArray, paramsArray, callback) {
    model.find(conditionArray, function (err, results) {
        results[0].save(paramsArray, function (err) {
            callback(err, results);
        });
    });
};

exports.executeOrmInsertQuery = function (model, paramsArray, callback) {
    model.create(paramsArray, function (err, results) {
        callback(err, results);
    });
};

exports.executeOrmDeleteQuery = function (model, conditionArray, callback) {
    model.find(conditionArray, function (err, results) {
        results[0].remove(function (err) {
            callback(err, results);
        });
    });
};



exports.executeParamOrmKendoFilterQuery = function (model, conditionArray, kParams, callback) {
    var params = convertKendoParams(kParams);
    model.find(conditionArray, params.filter, params.limit, params.offset).run(function (err, results) {
        callback(err, results);
    });
};

var convertKendoParams = function (kParams) {
    var params = {};
    if (kParams.take)
        params.limit = { limit: kParams.take };
    else
        params.limit = { limit: 1000 };
    
    if (kParams.skip)
        params.offset = { offset: kParams.skip };
    else
        params.offset = { offset: 0 };
    
    if (kParams.filter)
        params.filter = convertKendoFilter(kParams.filter);
    else
        params.filter = {};
    
    return params;
};

var convertKendoFilter = function (kFilter) {
    var childFilters = [];
    for (var i = 0; i < kFilter.filters.length; i++) {
        childFilters.push(convertKendoFilterItem(kFilter.filters[i]));
    }
    var filter = {};
    filter[kFilter.logic] = childFilters;
    return filter;
};

var convertKendoFilterItem = function (kFilterItem) {
    if (!kFilterItem.logic) {
        var filterItem = {};
        filterItem[kFilterItem.field] = getOrmOperatorValue(kFilterItem.operator, kFilterItem.value);
        return filterItem;
    }
    else {
        return convertKendoFilter(kFilterItem);
    }
};

var getOrmOperatorValue = function (kOperator, kValue) {
    var func = null;
    switch (kOperator) {
        case "eq":
            func = orm.eq;
            break;
        case "neq":
            func = orm.ne;
            break;
        case "lt":
            func = orm.lt;
            break;
        case "lte":
            func = orm.lte;
            break;
        case "gt":
            func = orm.gt;
            break;
        case "gte":
            func = orm.gte;
            break;
        case "startswith":
        case "endswith":
        case "contains":
            func = orm.like;
            break;
        default:
            func = orm.eq;
            break;
    }
    return func(getOrmValue(kOperator, kValue));
};

var getOrmValue = function (kOperator, kValue) {
    if (kOperator == "startswith") {
        return kValue + '%';
    }
    else if (kOperator == "endswith") {
        return '%' + kValue + '';
    }
    else if (kOperator == "contains") {
        return '%' + kValue + '%';
    }
    else if (typeof kValue == "number") {
        return kValue;
    }
    else {
        return kValue;
    }
};
