angular.module('semantique.controllers')

.controller('EditorChildController', ['$scope', '$stateParams', 'Base64Service', 'SparqlService', function($scope, $stateParams, Base64Service, SparqlService) {
    var Base64 = Base64Service;
    $scope.instance = Base64.decode($stateParams.instance);
    $scope.keyword = "";

    var query = 'SELECT DISTINCT ?predicate ?object WHERE {<' + $scope.instance + '> ?predicate ?object.}';

    SparqlService(query).then(function(res) {
        $scope.all = $scope.items = res.data.results.bindings.map(function(object) {
            return {
                predicate: object.predicate.value,
                object: object.object.value
            };
        });
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
        return SparqlService(sparql).then(function(res) {
            return res.data.results.bindings.map(function(object) {
                return object.object.value;
            }).filter(function(value) {
                return query.length > 0 ? value.toLowerCase().match(query.toLowerCase(), 'i') :  false;
            }).filter(function (x, i, self) {
                return self.indexOf(x) === i;
            });
        });
    };

    $scope.encode = Base64.encode;
}]);
