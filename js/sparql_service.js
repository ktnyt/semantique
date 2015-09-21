angular.module('semantique.services')

.factory('SparqlService', ['$q', '$http', 'Base64Service', function($q, $http, Base64Service) {
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
                    resolve((function(res) {
                        return res.data.results.bindings.map(function(object) {
                            var keys = Object.keys(object);
                            if(keys.length === 1) {
                                return object[keys[0]].value;
                            }
                            var ret = {};
                            for(var i in keys) {
                                var key = keys[i];
                                ret[key] = object[key].value;
                            }
                            return ret;
                        });
                    })(res));
                })
            });
        }
    };
}])

;
