angular.module('semantique.services')

.factory('SparqlService', ['$rootScope', '$q', '$http', 'Base64Service', function($rootScope, $q, $http, Base64Service) {
    var encode = Base64Service.encode;
    var base = 'http://dbpedia.org/sparql/?format=json&query=';
    var dict = {};

    return function(sparql) {
        var key = encode(sparql);
        if(key in dict) {
            return dict[key];
        } else {
            var url = base + encodeURIComponent(sparql);
            return dict[key] = $http.get(url).then(function(res) {
                return dict[key] = $q(function(resolve) {
                    resolve(res);
                })
            });
        }
    };
}]);
