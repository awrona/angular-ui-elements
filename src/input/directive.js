require('./style.scss');

var angular = require('angular');
var ngModuleName = 'cre8.input';
var ngModule = angular.module(ngModuleName, []);

module.exports = ngModuleName;

ngModule.directive('cre8InputWrapper', function() {
    return {
        restrict: 'E',
        controller: ctrl
    };

    function ctrl($scope, $element, $attrs) {
        var self = this;
        self.element = $element;

        self.setFocused = function(isFocused) {
            $element.toggleClass('cre8-input-focused', !!isFocused);
        };
        self.setHasValue = function(hasValue) {
            $element.toggleClass('cre8-input-has-value', !!hasValue);
        };
        self.setInvalid = function(isInvalid) {
            $element.toggleClass('cre8-input-invalid', !!isInvalid);
        };
    }

});


ngModule.directive('label', function() {
    return {
        restrict: 'E',
        require: '^?cre8InputWrapper',
        link: link
    };

    function link(scope, element, attr, wrapperCtrl) {
        if (!wrapperCtrl || attr.mdNoFloat) return;

        wrapperCtrl.label = element;
        scope.$on('$destroy', function() {
            wrapperCtrl.label = null;
        });
    }

});


ngModule.directive('input', inputTextareaDirective);
ngModule.directive('textarea', inputTextareaDirective);


function inputTextareaDirective() {
    return {
        restrict: 'E',
        require: ['^?cre8InputWrapper', '?ngModel'],
        link: link
    };

    function link(scope, element, attr, ctrls) {
        var containerCtrl = ctrls[0];
        var ngModelCtrl = ctrls[1];
        var isReadonly = angular.isDefined(attr.readonly);

        if ( !containerCtrl || !ngModelCtrl ) return;
        if (containerCtrl.input) {
            throw new Error("<cre8-input-wrapper> can only have *one* <input> or <textarea> child element!");
        }
        containerCtrl.input = element;

        element.addClass('cre8-input');

        var isErrorGetter = containerCtrl.isErrorGetter || function() {
                return ngModelCtrl.$invalid && ngModelCtrl.$touched;
            };
        scope.$watch(isErrorGetter, containerCtrl.setInvalid);


        element.on('input', inputCheckValue);

        if (!isReadonly) {
            element
                .on('focus', function(ev) {
                    containerCtrl.setFocused(true);
                })
                .on('blur', function(ev) {
                    containerCtrl.setFocused(false);
                    inputCheckValue();
                });

        }

        scope.$on('$destroy', function() {
            containerCtrl.setFocused(false);
            containerCtrl.setHasValue(false);
            containerCtrl.input = null;
        });

        function inputCheckValue() {
            // An input's value counts if its length > 0,
            // or if the input's validity state says it has bad input (eg string in a number input)
            containerCtrl.setHasValue(element.val().length > 0 || (element[0].validity || {}).badInput);
        }

    }

}
