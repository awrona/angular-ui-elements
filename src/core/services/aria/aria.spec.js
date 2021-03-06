describe('$cre8Aria service', function() {
  beforeEach(module('material.core'));

  describe('expecting attributes', function(){
    it('should warn if element is missing attribute', inject(function($compile, $rootScope, $log, $cre8Aria) {
      spyOn($log, 'warn');
      var button = $compile('<button><md-icon></md-icon></button>')($rootScope);

      $cre8Aria.expect(button, 'aria-label');

      expect($log.warn).toHaveBeenCalled();
    }));

    it('should warn if element is missing attribute value', inject(function($compile, $rootScope, $log, $cre8Aria) {
      spyOn($log, 'warn');
      var button = $compile('<button aria-label><md-icon></md-icon></button>')($rootScope);

      $cre8Aria.expect(button, 'aria-label');

      expect($log.warn).toHaveBeenCalled();
    }));

    it('should not warn if child element has attribute', inject(function($compile, $rootScope, $log, $cre8Aria) {
      spyOn($log, 'warn');
      var button = $compile('<button><md-icon aria-label="text"></md-icon></button>')($rootScope);

      $cre8Aria.expect(button, 'aria-label');

      expect($log.warn).not.toHaveBeenCalled();
    }));

    it('should warn if child with attribute is hidden', inject(function($compile, $rootScope, $log, $cre8Aria) {
      spyOn($log, 'warn');
      var container = angular.element(document.body);
      var button = $compile('<button><md-icon aria-label="text" style="display:none;"></md-icon></button>')($rootScope);

      container.append(button);

      $cre8Aria.expect(button, 'aria-label');

      expect($log.warn).toHaveBeenCalled();

      button.remove();

    }));
  });

});
