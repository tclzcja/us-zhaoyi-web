/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    const Session_Cache_Prefix = "cache ";

    const Api = window.Api;

    window.Cache = {
        Update: function (type, callback) {
            Api.Core(type, "multiple", null, function (data) {
                sessionStorage.setItem(Session_Cache_Prefix + type, JSON.stringify(data));
                if (callback) {
                    callback();
                }
            });
            return;
        },
        Get: function (type) {
            return JSON.parse(sessionStorage.getItem(Session_Cache_Prefix + type));
        },
        Count: function (type, callback) {
            Api.Core(type, "count", null, function (data) {
                sessionStorage.setItem(Session_Cache_Prefix + type, JSON.stringify(data));
                if (callback) {
                    callback();
                }
            });
            return;
        }
    };

}());