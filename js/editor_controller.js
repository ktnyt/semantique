angular.module('semantique.controllers')

.controller('EditorController', ['$scope', '$q', 'Base64Service', 'SparqlService', function($scope, $q, Base64Service, SparqlService) {
    var Base64 = Base64Service;

    $scope.types = function(query) {
        var sparql = 'SELECT DISTINCT ?type WHERE { ?instance <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> ?type. }';
        //return ['Loading...'];
        return SparqlService(sparql).then(function(res) {
            return res.data.results.bindings.map(function(object) {
                return object.type.value;
            }).filter(function(value) {
                return query.length > 0 ? value.toLowerCase().match(query.toLowerCase(), 'i') : false;
            }).filter(function (x, i, self) {
                return self.indexOf(x) === i;
            });
        });
    };

    $scope.instances = function(query) {
        var sparql = 'SELECT DISTINCT ?instance WHERE { ?instance <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <' + this.type + '>. }';
        return SparqlService(sparql).then(function(res) {
            return res.data.results.bindings.map(function(object) {
                return object.instance.value;
            }).filter(function(value) {
                return query.length > 0 ? value.toLowerCase().match(query.toLowerCase(), 'i') : false;
            }).filter(function (x, i, self) {
                return self.indexOf(x) === i;
            });

        });
    };

    $scope.encode = Base64.encode;
}]);
