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
                        optionsSubmitPlaceholder: '@optionsSubmitPlaceholder',
                        optionsDisabled: '=optionsDisabled'
                    },
                    template: '<div class="os-container"><div ng-click="toggleList()" ng-class="getHeaderClass()" class="os-header"><span ng-show="!showList">{{ optionsPlaceholder }}</span><span ng-show="showList">{{ optionsSubmitPlaceholder }}</span></div><div ng-show="showList" class="os-list-container"><div class="os-search"><div class="os-search-icon"><div></div><div></div></div><input ng-model="search" class="os-search-input"/></div><div class="os-list"><ul ng-if="!multiSelect"><li ng-repeat="option in optionsTempData | filter:search track by $index" ng-class="getOptionClass(option)" class="os-animate-repeat"><span ng-click="addToSelectedList(option)" class="os-button os-select">+</span><span ng-click="addToDeselectedList(option)" class="os-button os-deselect">-</span><span ng-bind="option.name" title="{{ option.name }}" class="os-option-name"></span></li></ul><ul ng-if="multiSelect"><li ng-repeat="option in optionsTempData | filter:search track by $index" ng-class="getOptionClass(option)" ng-click="addToSelectedList(option)" class="os-animate-repeat os-multi-option"><span ng-bind="option.name" title="{{ option.name }}" class="os-option-name"></span></li></ul></div></div><div ng-show="!showList" class="os-chosen-list"><div><ul ng-show="optionsSelected.length!=0" ng-if="!multiSelect"><li ng-repeat="option in optionsSelected track by $index" ng-click="removeFromList(option, true)"><span class="os-list-icon os-plus-icon">+</span><span ng-bind="option" title="{{ option }}"></span></li></ul><ul ng-show="optionsDeselected.length!=0" ng-if="!multiSelect"><li ng-repeat="option in optionsDeselected track by $index" ng-click="removeFromList(option, false)"><span class="os-list-icon os-minus-icon">-</span><span ng-bind="option" title="{{ option }}"></span></li></ul><ul ng-show="optionsSelected.length!=0" ng-if="multiSelect" class="os-multi-select-list"><li ng-repeat="option in optionsSelected track by $index" ng-click="removeFromList(option, true)"><span class="os-list-icon os-plus-icon">-</span><span ng-bind="option" title="{{ option }}"></span></li></ul></div></div></div>',
                    link: function (scope, element) {

                        scope.$watch('optionsDisabled', function () {
                            var elem = angular.element(element);
                            if (scope.optionsDisabled) {
                                scope.showList = false;
                                scope.optionsSelected = [];
                                if (!scope.multiSelect) {
                                    scope.optionsDeselected = [];
                                }
                                elem.addClass('os-disabled');
                            } else {
                                elem.removeClass('os-disabled');
                            }
                        });


                        scope.showList = false;
                        scope.toggleList = function() {
                            if (!scope.optionsDisabled) {
                                scope.showList = !scope.showList;

                                if (scope.showList) {
                                    $document.on('click', function(event){
                                        var isClickedElementChildOfThis = element
                                                .find(event.target)
                                                .length > 0;

                                        if (isClickedElementChildOfThis)
                                            return;

                                        scope.$apply(function(){
                                            scope.showList = false;
                                            scope.search = '';
                                        });
                                    });
                                }
                            }
                        };

                        if (!scope.optionsSelected) {
                            scope.optionsSelected = [];
                        }
                        if (!scope.optionsDeselected) {
                            scope.multiSelect = true;
                        }
                        if (!scope.optionsPlaceholder) {
                            $timeout(function() {
                                scope.optionsPlaceholder = 'Select options...';
                            });

                        }
                        if (!scope.optionsSubmitPlaceholder) {
                            $timeout(function() {
                                scope.optionsSubmitPlaceholder = 'OK';
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