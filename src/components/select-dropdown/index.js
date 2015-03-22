"use strict";

var angular = require('angular');

require('../../../build/bower_components/angular-disable-all/dist/angular-disable-all');
require('../../../build/bower_components/angular-open-dropdown/dist/angular-open-dropdown');
require('../../../build/bower_components/angular-open-dropdown/dist/angular-open-dropdown.css');


require('angular-sanitize');

require('../../../build/bower_components/angular-select-options/dist/angular-select-options');


require('../../../build/bower_components/angular-select-items/dist/angular-select-items');
require('../../../build/bower_components/angular-select-items/dist/angular-select-items.css');

require('../../../build/bower_components/angular-select-dropdown/dist/angular-select-dropdown');
require('../../../build/bower_components/angular-select-dropdown/dist/angular-select-dropdown.css');

require('./style.scss');


const ngModuleName = 'cre8.select-dropdown';

module.exports = ngModuleName;

angular.module(ngModuleName, [
    'selectDropdown'
]);