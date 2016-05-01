EFAPP.controller('EFAppController', function($rootScope, $scope, $location, $window, $cookies, $translate, utilFactory) {
   $rootScope.user = null;
    $scope.UserTaskName = null;
    $scope.isAuthenticatedUser = function () {
        if ($rootScope.isLoggedIn == undefined) {
            utilFactory.isAuthenticatedUser().success(function (data) {               
                var html = $.parseHTML(data);
                if (!html) {
                    $rootScope.user = data;
                }
            })
         .error(function (data) {
                console.log('error: ' + data);
                $rootScope.user = null;
            });
        }
    };
    
    
        $scope.setLanguage = setLanguage;

    function setLanguage(lang) {
        $cookies.__APPLICATION_LANGUAGE = lang;
        $translate.use(lang);
    }
    
    function init() 
    {
      
        var lang = $cookies.__APPLICATION_LANGUAGE || 'en';
        setLanguage(lang);      
      //  var UserTaskName = "";      

    }
    
    init();
    $scope.isAuthenticatedUser();
    
       $scope.temp="Header";
});