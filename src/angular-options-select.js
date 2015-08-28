/**!
 * AngularJS select directive with plus/minus options
 * @author  Dmitriy  <dmitriy.lopukhov@gmail.com>
 * @version 1.0
 * License: MIT
 */
(function() {
    var angularOptionsSelect = angular.module('angularOptionsSelect', []);

    angularOptionsSelect.directive('optionsSelect', ['$timeout',
        function ($timeout) {
            return {
                restrict: 'E',
                scope: {
                    optionsData: '=optionsData',
                    optionsSelected: '=optionsSelected',
                    optionsDeselected: '=optionsDeselected',
                    optionsPlaceholder: '@optionsPlaceholder'
                },
                template: '{html}',
                link: function (scope) {
                    scope.showList = false;

                    scope.toggleList = function() {
                        scope.showList = !scope.showList;
                    };

                    scope.optionsTempData = [];

                    if (scope.optionsData.length !== 0) {
                        console.log('scope.optionsData', scope.optionsData);
                        for (var i=0; i<scope.optionsData.length; i++) {
                            var item = {
                                name: scope.optionsData[i],
                                selected: false,
                                deselected: false
                            };
                            scope.optionsTempData.push(item);
                        }
                    }

                    scope.getOptionClass = function(option) {
                        if (option.selected) return 'os-selected';
                        if (option.deselected) return 'os-deselected';
                        return '';
                    };

                    scope.getHeaderClass = function() {
                        if (scope.showList) return 'os-header-ok';
                        return '';
                    };

                    scope.addToSelectedList = function(option) {
                        if (!option.selected && !option.deselected) {
                            option.selected = true;
                            option.deselected = false;
                        } else {
                            if (!option.selected && option.deselected) {
                                option.selected = true;
                                option.deselected = false;
                            } else {
                                option.selected = false;
                                option.deselected = false;
                            }
                        }

                        scope.optionsSelected = [];
                        for (var i=0; i<scope.optionsTempData.length; i++) {
                            if (scope.optionsTempData[i].selected) scope.optionsSelected.push(scope.optionsTempData[i].name);
                        }
                    };

                    scope.addToDeselectedList = function(option) {
                        if (!option.selected && !option.deselected) {
                            option.selected = false;
                            option.deselected = true;
                        } else {
                            if (option.selected && !option.deselected) {
                                option.selected = false;
                                option.deselected = true;
                            } else {
                                option.selected = false;
                                option.deselected = false;
                            }
                        }
                        scope.optionsDeselected = [];
                        for (var i=0; i<scope.optionsTempData.length; i++) {
                            if (scope.optionsTempData[i].deselected) scope.optionsDeselected.push(scope.optionsTempData[i].name);
                        }
                    };

                    scope.removeFromList = function(name, isSelected) {
                        for (var i=0; i<scope.optionsTempData.length; i++) {
                            if (scope.optionsTempData[i].name === name) {
                                scope.optionsTempData[i].selected = false;
                                scope.optionsTempData[i].deselected = false;
                            }
                        }
                        if (isSelected) {
                            for (var i=0; i<scope.optionsSelected.length; i++) {
                                if (scope.optionsSelected[i] === name) scope.optionsSelected.splice(i, 1)
                            }
                        } else {
                            for (var i=0; i<scope.optionsDeselected.length; i++) {
                                if (scope.optionsDeselected[i] === name) scope.optionsDeselected.splice(i, 1)
                            }
                        }
                    };
                }
            }
        }]
    );
})();

getIndex = function(arr, obj, attrName) {
    for(var i=0; i<arr.length; i++) {
        if (attrName) {
            if (arr[i][attrName] == obj[attrName]) return i;
        }
        else {
            if (arr[i] == obj) return i;
        }
    }
    return -1;
};