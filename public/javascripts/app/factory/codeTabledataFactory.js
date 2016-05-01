EFAPP.factory('codeTabledataFactory', ['$http', function ($http) {
        
        var urlBase = '/api';
        var dataFactory = {};

dataFactory.getCountries = function (request) {
            return $http.post('/api/getCountries', JSON.stringify(request));
        };
        
dataFactory.getStates = function (request) {
            return $http.post('/api/getStatesById', JSON.stringify(request));
        };
        
dataFactory.getCities = function (request) {
            return $http.post('/api/getCitiesById', JSON.stringify(request));
        };
        
        return dataFactory;
    }]);