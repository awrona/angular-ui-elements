angular.module('app', ['angular-ui-elements']).controller('appCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.selected1 = $scope.selected2 = null;
    $http.get('users.json', {
        responseType: 'json'
    }).success(function(data) {
        $scope.users = data;
    })
}]);