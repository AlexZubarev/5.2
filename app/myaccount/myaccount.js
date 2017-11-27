'use strict';

angular.module('myApp.account', [
  'ngRoute',
  'ui.router'
  //'ngMessages'
])


   .controller('myaccountCtrl', function($scope) {

     $scope.master= {};

     $scope.submitForm = function() {

       if ($scope.userForm.$valid) {
         alert('Вы правильно заполнили форму');
       }

     };


     $scope.update = function(user) {
       $scope.master= angular.copy(user);
     };

     $scope.reset = function() {
       $scope.user = angular.copy($scope.master);
     };

     $scope.reset();



  });