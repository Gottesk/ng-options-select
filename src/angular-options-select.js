/**!
 * AngularJS select directive with plus/minus options
 * @author  Dmitriy  <dmitriy.lopukhov@gmail.com>
 * @version 1.0
 * License: MIT
 */
(function() {
    var angularOptionsSelect = angular.module('angularOptionsSelect', []);

    angularOptionsSelect.directive('optionsSelect', ['$document', '$timeout',
        function ($document, $timeout) {
            return {
                restrict: 'E',
                scope: {
                    optionsData: '=optionsData',
                    optionsSelected: '=optionsSelected',
                    optionsDeselected: '=optionsDeselected',
                    optionsPlaceholder: '@optionsPlaceholder',
                    optionsSubmitPlaceholder: '@optionsSubmitPlaceholder' || 'OK'
                },
                template: '{html}',
                link: function (scope, element) {

                    angular.element(element).on('mousedown', function(event) {
                        event.stopPropagation();
                    });

                    scope.showList = false;
                    scope.toggleList = function() {
                        scope.showList = !scope.showList;

                        if (scope.showList) {

                            var docMousedown = function () {
                                    scope.showList = false;
                                    $document.off('mousedown');
                                    scope.$apply();
                            };

                            $document.on('mousedown', docMousedown);
                        }
                    };

                    if (!scope.optionsDeselected) {
                        scope.multiSelect = true;
                    }
                    if (!scope.optionsPlaceholder) {
                        $timeout(function() {
                            scope.optionsPlaceholder = 'Select options...';
                            scope.$apply(scope.optionsPlaceholder);
                        });

                    }
                    if (!scope.optionsSubmitPlaceholder) {
                        $timeout(function() {
                            scope.optionsSubmitPlaceholder = 'OK';
                            scope.$apply(scope.optionsSubmitPlaceholder);
                        });
                    }

                    scope.optionsTempData = [];

                    if (scope.optionsData.length !== 0) {
                        for (var i=0; i<scope.optionsData.length; i++) {
                            var item = {
                                name: scope.optionsData[i],
                                selected: false,
                                deselected: false
                            };
                            if (scope.multiSelect) {
                                for (var k=0; k<scope.optionsSelected.length; k++) {
                                    if (scope.optionsSelected[k] == item.name) item.selected = true;
                                }
                            }
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
                        scope.updateChosenLists();
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
                        scope.updateChosenLists();
                    };

                    scope.updateChosenLists = function() {
                        scope.optionsSelected = [];
                        for (var i=0; i<scope.optionsTempData.length; i++) {
                            if (scope.optionsTempData[i].selected) scope.optionsSelected.push(scope.optionsTempData[i].name);
                        }
                        if (!scope.multiSelect) {
                            scope.optionsDeselected = [];
                            for (var i = 0; i < scope.optionsTempData.length; i++) {
                                if (scope.optionsTempData[i].deselected) scope.optionsDeselected.push(scope.optionsTempData[i].name);
                            }
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