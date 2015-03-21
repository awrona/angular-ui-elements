var angular = require('angular'),
    moduleName = 'angular-ui-elements';

angular.module(moduleName, [
    require('./button'),
    require('./checkbox'),
    require('./input'),
    require('./radioButton')
]);

module.exports = moduleName;