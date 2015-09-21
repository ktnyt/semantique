angular.module('semantique.controllers')

.controller('EditorController', ['$scope', '$q', 'Base64Service', 'SparqlService', function($scope, $q, Base64Service, SparqlService) {
    var Base64 = Base64Service;

    $scope.types = function(query) {
        var sparql = 'SELECT DISTINCT ?type WHERE { ?instance <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> ?type. }';
        return SparqlService(sparql).then(function(array) {
            return array.filter(function(value) {
                return query.length > 0 ? value.toLowerCase().match(query.toLowerCase(), 'i') : false;
            });
        });
    };

    $scope.instances = function(query) {
        var sparql = 'SELECT DISTINCT ?instance WHERE { ?instance <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <' + this.type + '>. }';
        return SparqlService(sparql).then(function(array) {
            return array.filter(function(value) {
                return query.length > 0 ? value.toLowerCase().match(query.toLowerCase(), 'i') : false;
            });

        });
    };

    $scope.encode = Base64.encode;
}]);
