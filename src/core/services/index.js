"use strict";

var angular = require('angular'),
    ngModuleName = 'cre8.core.services';

module.exports = ngModuleName;

angular.module(ngModuleName, [
    require('./aria/aria'),
    require('./compiler/compiler'),
    require('./gesture/gesture'),
    require('./interimElement/interimElement'),
    require('./registry/componentRegistry'),
    require('./ripple/ripple'),
    require('./theming/theming')
]);