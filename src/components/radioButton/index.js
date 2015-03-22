require('./style.scss');

var angular = require('angular');
var ngModuleName = 'cre8.radioButton';
var ngModule = angular.module(ngModuleName, []);

module.exports = ngModuleName;

ngModule.directive('wowUiRadioGroup', wowUiRadioGroupDirective)
    .directive('wowUiRadioButton', wowUiRadioButtonDirective);


function wowUiRadioGroupDirective() {
    RadioGroupController.prototype = createRadioGroupControllerProto();

    return {
        restrict: 'E',
        controller: ['$element', RadioGroupController],
        require: ['wowUiRadioGroup', '?ngModel'],
        link: { pre: linkRadioGroup }
    };

    function linkRadioGroup(scope, element, attr, ctrls) {
        var rgCtrl = ctrls[0];
        var ngModelCtrl = ctrls[1];


        rgCtrl.init(ngModelCtrl);

        element.attr({
            'role': 'radiogroup',
            'tabIndex': element.attr('tabindex') || '0'
        });

    }

    function RadioGroupController($element) {
        this._radioButtonRenderFns = [];
        this.$element = $element;
    }

    function createRadioGroupControllerProto() {
        return {
            init: function(ngModelCtrl) {
                this._ngModelCtrl = ngModelCtrl;
                this._ngModelCtrl.$render = angular.bind(this, this.render);
            },
            add: function(rbRender) {
                this._radioButtonRenderFns.push(rbRender);
            },
            remove: function(rbRender) {
                var index = this._radioButtonRenderFns.indexOf(rbRender);
                if (index !== -1) {
                    this._radioButtonRenderFns.splice(index, 1);
                }
            },
            render: function() {
                this._radioButtonRenderFns.forEach(function(rbRender) {
                    rbRender();
                });
            },
            setViewValue: function(value, eventType) {
                this._ngModelCtrl.$setViewValue(value, eventType);
                // update the other radio buttons as well
                this.render();
            },
            getViewValue: function() {
                return this._ngModelCtrl.$viewValue;
            },
            selectNext: function() {
                return changeSelectedButton(this.$element, 1);
            },
            selectPrevious: function() {
                return changeSelectedButton(this.$element, -1);
            },
            setActiveDescendant: function (radioId) {
                this.$element.attr('aria-activedescendant', radioId);
            }
        };
    }
    /**
     * Change the radio group's selected button by a given increment.
     * If no button is selected, select the first button.
     */
    function changeSelectedButton(parent, increment) {
        // Coerce all child radio buttons into an array, then wrap then in an iterator
        var buttons = $mdUtil.iterator(parent[0].querySelectorAll('wow-ui-radio-button'), true);

        if (buttons.count()) {
            var validate = function (button) {
                // If disabled, then NOT valid
                return !angular.element(button).attr("disabled");
            };
            var selected = parent[0].querySelector('wow-ui-radio-button.wow-ui-checked');
            var target = buttons[increment < 0 ? 'previous' : 'next'](selected, validate) || buttons.first();
            // Activate radioButton's click listener (triggerHandler won't create a real click event)
            angular.element(target).triggerHandler('click');


        }
    }

}



function wowUiRadioButtonDirective() {
    var CHECKED_CSS = 'wow-ui-checked';

    return {
        restrict: 'E',
        require: '^wowUiRadioGroup',
        transclude: true,
        template: '<div class="wow-ui-container">' +
        '<div class="wow-ui-off"></div>' +
        '<div class="wow-ui-on"></div>' +
        '</div>' +
        '<div ng-transclude class="wow-ui-label"></div>',
        link: link
    };

    function link(scope, element, attr, rgCtrl) {
        var lastChecked;

        rgCtrl.add(render);
        attr.$observe('value', render);

        element
            .on('click', listener)
            .on('$destroy', function() {
                rgCtrl.remove(render);
            });

        function listener(ev) {
            if (element[0].hasAttribute('disabled')) return;

            scope.$apply(function() {
                rgCtrl.setViewValue(attr.value, ev && ev.type);
            });
        }

        function render() {
            var checked = (rgCtrl.getViewValue() == attr.value);
            if (checked === lastChecked) {
                return;
            }
            lastChecked = checked;
            if (checked) {
                element.addClass(CHECKED_CSS);
                rgCtrl.setActiveDescendant(element.attr('id'));
            } else {
                element.removeClass(CHECKED_CSS);
            }
        }
    }
}