# ng-options-select
AngularJS directive for select and deselect options (returns two arrays)

<strong> Demo is coming soon. </strong>

For bug report or feature request please <a href="https://github.com/Gottesk/ng-options-select/issues/new">create a new issue</a>. For faster response provide steps to reproduce/versions with a jsfiddle from here.

#How to use it

Include the 2 files from "dist" directory:

    angular-options-select.css
    angular-options-select.js

Add `'angularOptionsSelect'` to your module's list of dependencies.

And then you can use it like this:

    <options-select options-data="countries"
                    options-selected="countries_selected"
                    options-deselected="countries_deselected"
                    options-placeholder="Choose countries">
    </options-select>
    
The "options-data" must be defined in your controller, like this:

    $scope.countries = ["Armenia", "Australia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Brazil", "Cambodia", "China", "Czech Republic", "Denmark", "Egypt", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hong Kong", "Hungary", "Iceland", "India", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Kazakhstan", "Korea, North", "Korea, South", "Kyrgyzstan", "Latvia", "Liberia", "Liechtenstein", "Lithuania", "Macedonia", "Malta", "Mexico", "Moldova", "Morocco", "Nepal", "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Pakistan", "Palestinian Territories", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Serbia", "Singapore", "Slovakia", "Slovenia", "Spain ", "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Thailand", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zimbabwe"];
