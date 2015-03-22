"use strict";

var angular = require('angular'),
    ngModuleName = 'cre8.core';

module.exports = ngModuleName;

angular.module(ngModuleName, [
    require('./services'),
    require('./util')
]);