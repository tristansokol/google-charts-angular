# google-charts-angular
A simple angular directive for adding Google Charts to an angular app.

Sample and new mixtape on the way
## Usage
1. Include the Google Ajax apis in your project. ( add `<script type="text/javascript" src="https://www.google.com/jsapi"></script>` to your page).
2. Add the `google-charts-angular.js` to your page.
3. Add `google-chart` module to your angular application `var myApp = angular.module('module-name', ['google-chart'])`
4. Place an element with a `google-chart` attribute on the page `<div google-chart="ColumnChart" id="bestGraph" ng-model="myModel"></div>`

If all went well, you should have a graph on your page powered by the data in $scope.myModel.

**Notice**
Since function in directives are only called once, all of the logic behind the graph is wrapped in a `$watch` function that keeps track of a variable called `drawGraphsVar`. Whenever you want to redraw the graphs because your underlying data in `ng-model` changed or practically when a window is resized, change the value of `drawGraphsVar`.

## Reference
### Attributes
some attributes are required, but others are options that are helpfully broken out as attribute flags to allow you to make common changes to a graph without looking up what the options are for them. 
#### `google-chart`
* **Required** 
* *values*: any [Google Chart](https://developers.google.com/chart/interactive/docs/gallery "Google Chart Gallery") type (though only Bar, Column, Pie and other 'main' charts have been tested, if you find one that doesn't work be sure to say something. 
* example: `google-chart="ColumnChart`
#### `ng-model`
* **Required**
* *value*: An scope variable object with the following properties
    * `dataTable`: An array of the data you want to visualize, with headers in the first row. The Google Charts function `arrayToDataTable()` is called directly on this array to build the graph. This property is **required**.
    * `options`: An object with additional [Google Chart options](https://developers.google.com/chart/interactive/docs/customizing_charts, "Customizing Google Charts"), such as graph styling, for your graph. These options are added to some default options before the graph is drawn. 
* example: 
    ```
    // On your page
    <div google-chart="BarChart" ng-model="myModel"></div>
    
    // In a controller
    $scope.myModel = {
    dataTable: [
        ['name', 'age'],
        ['Jack', 35],
        ['Bobby',18],
    ],
    options:{
            height:'300'
        }
    }
    ```
#### `nolegend`
* optional
* *value*: none
* example: `<div google-chart="BarChart" nolegend ng-model="myModel"></div>`
* Sets the option for no legend to be displayed.
#### `animated`
* optional
* *value*: none
* example: `<div google-chart="BarChart" animated ng-model="myModel"></div>`
* Adds the [startup animation](https://developers.google.com/chart/interactive/docs/animation?hl=en "Google Charts Animation Reference" ) and will animate changes to the underlying data when the graph is redrawn. For the latter to work you must also have a `id` attribute for your chart. 
#### `id`
* optional
* *value*: a unique name
* example: `<div google-chart="BarChart" animated id="UniqueChart" ng-model="myModel"></div>`
* Allows the Google Chart object to be stored in scope so that subsequent calls that update the underlying model will animate the transition instead of drawing a new graph. 
#### `logx`
* optional
* *value*: none
* example: `<div google-chart="BarChart" logx ng-model="myModel"></div>`
* plots the graph with a log scale in the x or horizontal axis
#### `title`
* optional
* *value*: string
* example: `<div google-chart="BarChart" title="Best Graph" ng-model="myModel"></div>`
* sets the title for the chart