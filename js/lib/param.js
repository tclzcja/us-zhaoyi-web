/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    var params;

    window.addEventListener("hashchange", function () {
        params = {};
        var ps = (window.location.hash.substr(1)).split("&");
        for (var i = 0; i < ps.length; i++) {
            var a = ps[i].split("=");
            params[a[0]] = a[1];
        }
    });

    window.Param = {
        Get: function (key) {
            return params[key];
        }
    };



}());