EFAPP.controller('userCtrl', ['$scope', '$rootScope', '$http', 'usersdataFactory', '$window' , 'codeTabledataFactory' , function ($scope, $rootScope, $http, usersdataFactory, $window, codeTabledataFactory) {
        
  $scope.addUser=function (formUserDetail) {
      if (formUserDetail.$valid) {
      $scope.userData = {
                        userId:$scope.addUser.userId,
                        firstName: $scope.addUser.firstName,
                        lastName: $scope.addUser.lastName, 
                        email: $scope.addUser.email,
                        phoneNumber: $scope.addUser.phoneNo,
                        city:$scope.addUser.city,
                        state:$scope.addUser.state,
                        country:$scope.addUser.country,
                        zip:$scope.addUser.zip, 
                        designation: $scope.addUser.designation,
                        password: $scope.addUser.password,
                        enabled:true
                            };
                            if($scope.userData.designation=='Donor')
                                $scope.userData.badge='D';
                            else
                                $scope.userData.badge='B';
                            
                                usersdataFactory.saveUserData($scope.userData).success(function (response) {
                                console.log(response);
                                alert("Saved Successfully");
                                $scope.addUser={};
                                $window.location.href='/'
                            }).error(function (response) {
                                $scope.error = "Sorry! Something went w rong. Notified to admin. Please reload the page. " + response.data;
                                $scope.isDisabled = false;
                            });
                            }
}


 $scope.onCountryChange= function (country) {
     loadStateddl(country.id);
      console.log('country ID: ' + country.id);
  }
  
  $scope.onStateChange= function (state) {
     loadCityddl(state.id);
      console.log('State ID: ' + state.id);
  }
  
  function loadCountryddl() {
      codeTabledataFactory.getCountries().success(function (response) {
          $scope.country=response.data;
          console.log($scope.country);
      }).error(function (response) {
          alert('error')
      })
  }
  
  function loadStateddl(countryId) {
      var request ={'country_id' :countryId}
      codeTabledataFactory.getStates(request).success(function (response) {
          $scope.states=response.data;
          console.log($scope.states);
      }).error(function (response) {
          alert('error')
      })
  }
    function loadCityddl(state_id) {
      var request ={'state_id' :state_id}
      codeTabledataFactory.getCities(request).success(function (response) {
          $scope.cities=response.data;
          console.log($scope.cities);
      }).error(function (response) {
          alert('error')
      })
  }
        $scope.init = function () {
            loadCountryddl();
            $scope.text="Users";
        };
        
        $scope.init();

    }]);

