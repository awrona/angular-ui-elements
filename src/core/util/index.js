"use strict";

var angular = require('angular'),
    ngModuleName = 'cre8.core.util';

module.exports = ngModuleName;

angular.module(ngModuleName, [
    require('./constant'),
    require('./iterator'),
    require('./media'),
    require('./util')
]);