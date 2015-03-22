'use strict';

var angular = require('angular');

const ngModuleName = 'cre8.core.util.media';

module.exports = ngModuleName;

angular.module(ngModuleName, [
    require('./constant')
])
.factory('$cre8Media', mdMediaFactory);

/**
 * @ngdoc service
 * @name $cre8Media
 * @module cre8.core
 *
 * @description
 * `$cre8Media` is used to evaluate whether a given media query is true or false given the
 * current device's screen / window size. The media query will be re-evaluated on resize, allowing
 * you to register a watch.
 *
 * `$cre8Media` also has pre-programmed support for media queries that match the layout breakpoints.
 *  (`sm`, `gt-sm`, `md`, `gt-md`, `lg`, `gt-lg`).
 *
 * @returns {boolean} a boolean representing whether or not the given media query is true or false.
 *
 * @usage
 * <hljs lang="js">
 * app.controller('MyController', function($cre8Media, $scope) {
 *   $scope.$watch(function() { return $cre8Media('lg'); }, function(big) {
 *     $scope.bigScreen = big;
 *   });
 *
 *   $scope.screenIsSmall = $cre8Media('sm');
 *   $scope.customQuery = $cre8Media('(min-width: 1234px)');
 *   $scope.anotherCustom = $cre8Media('max-width: 300px');
 * });
 * </hljs>
 */

function mdMediaFactory($cre8Constant, $rootScope, $window) {
  var queries = {};
  var mqls = {};
  var results = {};
  var normalizeCache = {};

  $cre8Media.getResponsiveAttribute = getResponsiveAttribute;
  $cre8Media.getQuery = getQuery;
  $cre8Media.watchResponsiveAttributes = watchResponsiveAttributes;

  return $cre8Media;

  function $cre8Media(query) {
    var validated = queries[query];
    if (angular.isUndefined(validated)) {
      validated = queries[query] = validate(query);
    }

    var result = results[validated];
    if (angular.isUndefined(result)) {
      result = add(validated);
    }

    return result;
  }

  function validate(query) {
    return $cre8Constant.MEDIA[query] ||
           ((query.charAt(0) !== '(') ? ('(' + query + ')') : query);
  }

  function add(query) {
    var result = mqls[query] = $window.matchMedia(query);
    result.addListener(onQueryChange);
    return (results[result.media] = !!result.matches);
  }

  function onQueryChange(query) {
    $rootScope.$evalAsync(function() {
      results[query.media] = !!query.matches;
    });
  }

  function getQuery(name) {
    return mqls[name];
  }

  function getResponsiveAttribute(attrs, attrName) {
    for (var i = 0; i < $cre8Constant.MEDIA_PRIORITY.length; i++) {
      var mediaName = $cre8Constant.MEDIA_PRIORITY[i];
      if (!mqls[queries[mediaName]].matches) {
        continue;
      }

      var normalizedName = getNormalizedName(attrs, attrName + '-' + mediaName);
      if (attrs[normalizedName]) {
        return attrs[normalizedName];
      }
    }

    // fallback on unprefixed
    return attrs[getNormalizedName(attrs, attrName)];
  }

  function watchResponsiveAttributes(attrNames, attrs, watchFn) {
    var unwatchFns = [];
    attrNames.forEach(function(attrName) {
      var normalizedName = getNormalizedName(attrs, attrName);
      if (attrs[normalizedName]) {
        unwatchFns.push(
            attrs.$observe(normalizedName, angular.bind(void 0, watchFn, null)));
      }

      for (var mediaName in $cre8Constant.MEDIA) {
        normalizedName = getNormalizedName(attrs, attrName + '-' + mediaName);
        if (!attrs[normalizedName]) {
          return;
        }

        unwatchFns.push(attrs.$observe(normalizedName, angular.bind(void 0, watchFn, mediaName)));
      }
    });

    return function unwatch() {
      unwatchFns.forEach(function(fn) { fn(); })
    };
  }

  // Improves performance dramatically
  function getNormalizedName(attrs, attrName) {
    return normalizeCache[attrName] ||
        (normalizeCache[attrName] = attrs.$normalize(attrName));
  }
}
