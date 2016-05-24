/* jshint browser: true, esversion: 6 */

(function () {

    'use strict';

    var key = ['doctor', 'hospital', 'subject', 'service', 'insurance'];

    var Api = window.Api;

    window.Cache = {
        Fetch: function (callback) {
            var fire_counter = 0;
            for (var i = 0; i < key.length; i++) {
                sessionStorage.removeItem('cache ' + key[i]);
                sessionStorage.removeItem('cache ' + key[i] + ' hash');
                Fire(key[i]);
            }

            function Fire(resource) {
                Api.Core('/' + resource + '/read', null, function (data) {
                    sessionStorage.setItem('cache ' + resource, JSON.stringify(data));
                    var hash = {};
                    for (var i = 0; i < data.length; i++) {
                        hash[data[i]._id] = data[i];
                    }
                    sessionStorage.setItem('cache ' + resource + ' hash', JSON.stringify(hash));
                    fire_counter++;
                    if (fire_counter >= key.length) {
                        if (callback) {
                            callback();
                        }
                    }
                });
            }
        },
        Get: function (type) {
            return JSON.parse(sessionStorage.getItem('cache ' + type));
        },
        Hash: function (type) {
            return JSON.parse(sessionStorage.getItem('cache ' + type + ' hash'));
        }
    };

}());