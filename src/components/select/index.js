"use strict";

require('./style.scss');

var angular = require('angular');

const ngModuleName = 'cre8.select';

module.exports = ngModuleName;

angular.module(ngModuleName, [
    //require('../../core'),
    require('./selected-items'),
    require('./menu'),
    require('./option')
])
    .directive('cre8Select', SelectDirective)
    .directive('cre8SelectLabel', SelectLabelDirective);

/**
 * @ngdoc directive
 * @name cre8Select
 * @restrict E
 * @module cre8.select
 *
 * @description Displays a select box, bound to an ng-model
 *
 * @param {expression} ng-model The model
 * @param {boolean=} multiple Whether it's multiple.
 * @param {string=} placeholder Placeholder hint text.
 *
 * @usage
 * With a placeholder (label is added dynamically)
 * <cre8-select
 *  ng-model="someModel"
 *  placeholder="Select something..." >
 *     <cre8-select-label>{{ user ? user.name : 'Assign to user' }}</cre8-select-label>
 *     <cre8-option ng-value="user" ng-repeat="user in users">{{user.name}}</cre8-option>
 * </cre8-select>
 *
 * With an explicit label
 * <cre8-select ng-model="someModel" >
 *     <cre8-select-label>{{ user ? user.name : 'Assign to user' }}</cre8-select-label>
 *     <cre8-option ng-value="user" ng-repeat="user in users">{{user.name}}</cre8-option>
 * </cre8-select>
 *
 */
function SelectDirective($interpolate, $compile, $parse) {
    return {
        restrict: 'E',
        //replace: true,
        require: ['ngModel'],
        //transclude: true,
        compile: compile,
        //template: template,
        controller: function() { } // empty placeholder controller to be initialized in link
    };

    //function template(element, attrs) {
    //    var html = element.html().trim();
    //
    //    return [
    //        '<div class="cre8-select-container">',
    //            '<cre8-select-label></cre8-select-label>',
    //            '<cre8-select-menu>',
    //                '<ng-transclude></ng-transclude>',
    //            '</cre8-select-menu>',
    //        '</div>'
    //    ].join('');
    //}

    function compile(element, attr) {
        // The user is allowed to provide a label for the select as md-select-label child
        var labelEl = element.find('cre8-select-label').remove();

        // If not provided, we automatically make one
        if (!labelEl.length) {
            labelEl = angular.element('<cre8-select-label><span></span></cre8-select-label>');
        }

        // Use everything that's left inside element.contents() as the contents of the menu
        var selectTemplate = '<div class="cre8-select-container">' +
            '<cre8-select-menu ' +
            (angular.isDefined(attr.multiple) ? 'multiple' : '') + '>' +
            element.html() +
            '</cre8-select-menu></div>';

        element.empty().append(labelEl).append(selectTemplate);

        return postLink;

        function postLink(scope, element, attr, ctrls) {
            var isOpen,
                isDisabled,
                cre8SelectCtrl = ctrls[0],
                ngModel = ctrls[1],
                labelEl = element.find('cre8-select-label'),
                customLabel = labelEl.text().length !== 0,
                selectContainer, selectScope;

            element.addClass('cre8-select');

            createSelect();

            attr.$observe('disabled', function(disabled) {
                if (typeof disabled == "string") {
                    disabled = true;
                }
                // Prevent click event being registered twice
                if (isDisabled !== undefined && isDisabled === disabled) {
                    return;
                }
            });

            // Create a fake select to find out the label value
            function createSelect() {
                selectContainer = angular.element(selectTemplate);
                var selectEl = selectContainer.find('cre8-select-menu');
                selectEl.data('$ngModelController', ngModel);
                selectEl.data('$cre8SelectController', cre8SelectCtrl);
                selectScope = scope.$new();
                selectContainer = $compile(selectContainer)(selectScope);
            }

        }


    }
}

function SelectLabelDirective() {
    return {
        restrict: 'E',
        template: '<div class="cre8-select-label" ng-transclude></div>',
        replace: true,
        transclude: true
    };
}