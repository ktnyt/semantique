angular.module('semantique.controllers')

.controller('EditorChildController', ['$scope', '$stateParams', 'Base64Service', 'SparqlService', function($scope, $stateParams, Base64Service, SparqlService) {
    var Base64 = Base64Service;
    $scope.instance = Base64.decode($stateParams.instance);
    $scope.keyword = "";

    var query = 'SELECT DISTINCT ?predicate ?object WHERE {<' + $scope.instance + '> ?predicate ?object.}';

    SparqlService(query).then(function(array) {
        $scope.all = $scope.items = array;
    });

    $scope.filter = function() {
        var keyword = this.keyword;

        if(!keyword) keyword = "";

        $scope.items = $scope.all.filter(function(object) {
            if(object.predicate.toLowerCase().match(keyword.toLowerCase())) {
                return true;
            }
            if(object.object.toLowerCase().match(keyword.toLowerCase())) {
                return true;
            }
            return false;
        });
    };

    $scope.predicates = function(item, query) {
        var sparql = 'SELECT DISTINCT ?object WHERE { ?subject <' + item.predicate + '> ?object. }';
        return SparqlService(sparql).then(function(array) {
            return array.filter(function(value) {
                return query.length > 0 ? value.toLowerCase().match(query.toLowerCase(), 'i') :  false;
            }).filter(function (x, i, self) {
                return self.indexOf(x) === i;
            });
        });
    };

    $scope.encode = Base64.encode;
}]);
