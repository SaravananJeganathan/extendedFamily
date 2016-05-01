EFAPP.factory('usersdataFactory', ['$http', function ($http) {
        
        var urlBase = '/api';
        var dataFactory = {};

    //     dataFactory.saveDonorData = function (request) {
    //         return $http.post('/api/saveDonor', JSON.stringify(request));
    //     };       
    //    dataFactory.saveBeneficiaryData = function (request) {
    //         return $http.post('/api/saveBeneficiary', JSON.stringify(request));
    //     };

dataFactory.saveUserData = function (request) {
            return $http.post('/api/saveUser', JSON.stringify(request));
        };



        return dataFactory;
    }]);