(function() {

    angular.module('nadobit.config', [])

    .provider('nbConfig', function()
    {
        this.url = 'config.js';

        this.$get = ['$http', '$q', function($http, $q) {
            return new ConfigService($http, $q, this);
        }];
    })

    ;

    function ConfigService($http, $q, config)
    {
        var configObj = null;

        this.getConfigObj = function() {
            if (configObj) {
                return configObj;
            }

            return configObj = $http.get(config.url).then(function(res) {
                configObj = eval(res.data);
                return configObj;
            });
        };

        this.get = function(property) {
            return $q.when(this.getConfigObj()).then(function(obj) {
                return obj[property];
            });
        };
    }

}());
