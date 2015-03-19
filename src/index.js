var angular = require('angular');
var moduleName = 'angular-ui-elements';
var mod = angular.module(moduleName, [
    require('./input/directive')
]);

module.exports = moduleName;