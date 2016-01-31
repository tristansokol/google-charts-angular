(function(){
    "use strict";

    var googleChart = googleChart || angular.module("google-chart",[]);
    google.load('visualization', '1.0', {'packages':['corechart']});
    googleChart.directive("googleChart",function(){ 
        return{
            restrict : "A", 
            link: function($scope, $elem, $attr){
                $scope.$watch('drawGraphsVar', function(newValue, oldValue) {
                    if(typeof $scope[$attr.ngModel] === 'undefined'){
                        return false;
                    };
                    try{
                        var dt = google.visualization.arrayToDataTable($scope[$attr.ngModel].dataTable);
                    }catch(err){
                        console.log(err);
                        debugger;
                    }
                //default options
                var defaultOptions = {
                    height:'100%',
                    width:'100%',
                    backgroundColor: { fill:'transparent' },
                    //chartArea:{left:'10%',top:'10%',width:"80%",height:"80%"},
                    //sliceVisibilityThreshold:.01,
                    hAxis:{}
                };
                var options = defaultOptions;

                if($scope[$attr.ngModel].options){
                    var passedOptions = $scope[$attr.ngModel].options;
                    for (var i = 0; i < Object.keys(passedOptions).length; i++) {
                        //iterates through passed options and assigns them to the used option object.
                        options[Object.keys(passedOptions)[i]] = passedOptions[Object.keys(passedOptions)[i]];
                    }
                }

                if($attr.nolegend==''){
                    options.legend = {position:'none'};
                }
                if($attr.animated==''){
                    options.animation={
                        startup:true,
                        duration: 1000,
                        easing: 'out'
                    }
                }
                if($attr.logx==''){
                    options.hAxis.logScale = true;
                }
                if($scope[$attr.ngModel].title){
                    options.title = $scope[$attr.ngModel].title;
                }
                if(typeof $scope[$attr.id+'-chart'] == 'undefined'){
                    $scope[$attr.id+'-chart'] = new google.visualization[$attr.googleChart]($elem[0]);
                }
                
                $scope[$attr.id+'-chart'].draw(dt,options)

            });
}
}
});
})();
