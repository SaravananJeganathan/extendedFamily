EFAPP.factory('utilFactory', ['$rootScope', '$http', '$q', '$window', '$location', 'toaster','blockUIConfig', 'blockUI', function ($rootScope, $http, $q, $window, $location, toaster, blockUIConfig, blockUI) {

    var baseUrl = $("base").first().attr("href");
    var urlBase = baseUrl + 'api';
    var utilFactory = {};

    //Base Obejcts
    utilFactory.$rootScope = $rootScope;
    utilFactory.$q = $q;
    utilFactory.toaster = toaster;
    utilFactory.blockUIConfig = blockUIConfig;
    utilFactory.blockUI = blockUI;
     utilFactory.$http = $http;
     utilFactory.$window = $window;      
    
    //RegEx
    utilFactory.regExpPositiveDecimal = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
    utilFactory.regExpEmailId = /^[A-Za-z0-9._-]+[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z.]{2,5}$/;
    utilFactory.regExpPhoneNo = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
    utilFactory.regExUrl = /^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)$/;

    //Base Methods
    utilFactory.authenticateUser = function () {
        $http.get(urlBase + '/AccountApi/GetCurretUserInfo').success(function (response) {
            utilFactory.userInfo = response;
        }).error(function (error) {
            console.log(error);
        });
    }
                
        utilFactory.getUserTaskAuth = function (request) {
            return $http.post('/api/UserTaskAuth', JSON.stringify(request));
        };//sad
        
        utilFactory.isAuthenticatedUser = function () {
            return $http.get('/api/isAuthenticatedUser');
        };
        
        //utilFactory.getUserTaskAuth = function (request) {
        //    return $http.post('/api/UserTaskAuth', JSON.stringify(request));
        //};//sad
   
    return utilFactory;
}]);