var myapp = angular.module('myapp', ["ngResource", 'ngRoute', "Devise"]);

myapp.controller('signOutCtrl', ['$scope', '$http', '$resource','Auth','$location', '$window','$filter','Tasks','Task','$rootScope', function($scope, $http, $resource, Auth, $location, $window, $filter, Tasks, Task, $rootScope) {
  $scope.signout = function() {
    Auth.logout().then(function(oldUser) {
      $window.location.href = '/';
    }, function(error) {
      // An error occurred logging out.
    });
  };    
}]);
    
myapp.controller('userCtrl', ['$scope', '$http', '$resource','Auth','$location', '$window','$filter','Tasks','Task','$rootScope', function($scope, $http, $resource, Auth, $location, $window, $filter, Tasks, Task, $rootScope) {
  //console.log(Devise.Auth)
  $scope.task = { description: '', task_date: ''} 
  $scope.task.shared_users = ''
  $scope.sign_up = function() {
    var credentials = {
      email: $scope.user_name,
      password: $scope.password ,
      password_confirmation: $scope.cpassword 
    };
    Auth.register(credentials).then(function(registeredUser) {
      $window.location.href = '/tasks';
      console.log(registeredUser); // => {id: 1, ect: '...'}
    }, function(error) {
      // Registration failed...
    });
  }      
  $scope.sign_in = function() {
    var credentials = {
      email: $scope.user_name,
      password: $scope.password 
    };
    Auth.login(credentials).then(function(user) {
      $window.location.href = '/tasks';
    }, function(error) {
      // Authentication failed...
    });    
  };
  
  $scope.update_user = function() {
    $http.put('/users.json', {"user" : {"email": $scope.email, "current_password": $scope.curpassword}})
    .then(function(response) {
      $window.location.href = '/tasks';
    });
  };
}]);

myapp.factory('Tasks', ['$resource',function($resource){
  return $resource('/tasks.json', {},{
    show: { method: 'GET'},
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myapp.factory('Task', ['$resource', function($resource){
  return $resource('/tasks/:id.json', {}, {
    show: { method: 'GET'},
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

 
myapp.config(function(AuthProvider) {
  AuthProvider.registerPath('/users.json');
  AuthProvider.registerMethod('Post');
  AuthProvider.resourceName('user');
  
  AuthProvider.loginPath('/users/sign_in.json');
  AuthProvider.loginMethod('Post');
  AuthProvider.resourceName('user');
  
  AuthProvider.logoutPath('/users/sign_out.json');
  AuthProvider.logoutMethod('Delete');
});

// custom directives for practice //
myapp.directive('appname', function(){
  return {
    restrict: "E",
    template: "<div enter leave> Todo List </div>"
  }
});

myapp.run(function($rootScope, $log){
  $rootScope.$log = $log;
});
myapp.config(function($logProvider){
  $logProvider.debugEnabled(true);
});
